from flask import Flask, send_from_directory, session, request, make_response
from flask_cors import CORS, cross_origin
import logging, json, psycopg2, os
import HelpFunc
from datetime import datetime
from flask_talisman import Talisman

# Configure application
app = Flask(__name__, static_folder='front-app/build', static_url_path='')
#secret key
app.config["SECRET_KEY"] = 'asdasRDW5%#^rt&466rsDFHtyfRgtuy*gfc'

@app.before_first_request
def before_first_request():
    file_handler = logging.StreamHandler()
    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.INFO)

# configure cors
CORS(app, supports_credentials=True)

#Talisman(app)

app.config.update(
    REMEMBER_COOKIE_SECURE = True,
    SESSION_COOKIE_HTTPONLY=True,
    REMEMBER_COOKIE_HTTPONLY = True,
    SESSION_COOKIE_SAMESITE='Lax',
)

# make session permanent
@app.before_request
def make_session_permanent():
    session.permanent = True

# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

# Define database
DATABASE_URL = os.environ['DATABASE_URL']
conn = psycopg2.connect(DATABASE_URL, sslmode='require')
db = conn.cursor()

@app.route("/api", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        # get data from request
        wordsArr, selectedWord, hardModeOn, wordsNum = request.json["wordsArr"], request.json["selectedWord"].lower(), request.json["hardModeOn"], request.json["wordsNum"]
        wordArr = wordsArr[wordsNum]
        # make word from wordArr
        currentWord = ""
        for w in wordArr:
            currentWord += w["letter"].lower()

        # check if word is valid
        if len(currentWord) != 5:
            return json.dumps({"status" : "error", "message": "Word not full"})
        with open("Words.txt", "r") as wordsFile:
            if (currentWord + "\n") not in wordsFile:
                return json.dumps({"status": "error", "message": "Invalid word"})
        
        # edit wordsArr with new guessed word        
        wordArr = HelpFunc.check_word(wordArr, selectedWord, currentWord)
        wordsArr[wordsNum] = wordArr
        session["wordsArr"] = wordsArr
        
        # if wrong guess and there are guesses left
        if currentWord != selectedWord and wordsNum < 5:
            session["wordsNum"] = int(wordsNum) + 1
            return json.dumps({"status": "wrong", "wordsArr": wordsArr})
        
        # if its not first time playing
        if session.get("user_id") is not None:
            db.execute("SELECT current_streak, max_streak FROM users WHERE id = %s", (session["user_id"], ))
            streak_data = db.fetchone()
            if streak_data is not None:
                current_streak, max_streak = streak_data
            else:
                current_streak = max_streak = 0
        else:
            current_streak = max_streak = 0
        # if didnt guess the word
        if currentWord != selectedWord and wordsNum == 5:
            current_streak = 0
        # if word was guessed
        elif currentWord == selectedWord:
            current_streak += 1
            # check for max streak
            if current_streak > max_streak:
                max_streak = current_streak
            
        if session.get("user_id") is None:
            # initilize games arr
            gamesArr = [0 for i in range(6)]
            # add guess place to array
            if not (currentWord != selectedWord and wordsNum == 5):
                gamesArr[wordsNum] += 1
            # insert into db
            db.execute("INSERT INTO users (current_streak, max_streak, total_games, games) VALUES (%s, %s, %s, %s) RETURNING id", (current_streak, max_streak, 1, gamesArr))
            # set user id at session
            id = db.fetchone()[0]
            session["user_id"] = id
        else:
            db.execute("UPDATE users SET current_streak = %s, max_streak = %s, total_games = total_games + 1, games[%s] = games[%s] + 1 WHERE id = %s", (current_streak, max_streak, wordsNum + 1, wordsNum + 1, session["user_id"]))
        conn.commit()
        
        stats = HelpFunc.get_stats(db)
        
        session["finished"] = True
        session["correct"] = currentWord == selectedWord
        
        return json.dumps({"status": "finished", "wordsArr": wordsArr, "stats" : stats, "correct": currentWord == selectedWord})
        

    elif request.method == "GET":
        wordsArr = session.get("wordsArr")
        wordsNum = session.get("wordsNum")
        today = datetime.today().strftime("%Y-%m-%d")
        # create game arr 
        if wordsArr is None or session.get("date") != today:
            wordsArr = HelpFunc.create_wordsArr()
            session["wordsArr"] = wordsArr
            session["date"] = today
            session["wordsNum"] = 0
            session["finished"] = session["correct"] = False
            wordsNum = 0
        
        selectedWord, wordCount = HelpFunc.generate_word(db, conn)
        
        # get stats
        stats = HelpFunc.get_stats(db)
        
        # check if there is a user in db if not clear session
        db.execute("SELECT * FROM users WHERE id = %s", (session.get("user_id"),))
        if db.fetchone() is None:
            session.pop("user_id", None)
            
        return json.dumps({"wordsArr": wordsArr, "selectedWord": selectedWord, "wordCount": wordCount, "wordsNum": wordsNum, "stats": stats, "finished": session.get("finished") if session.get("finished") is not None else False, "correct": session.get("correct") if session.get("correct") is not None else False, "showInfo": session.get("user_id") is None})

@app.route("/")
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
    
    