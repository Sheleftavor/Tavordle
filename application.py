from flask import Flask, send_from_directory, session, request
from flask_cors import CORS, cross_origin
import logging, json, psycopg2
import HelpFunc
from datetime import datetime

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
CORS(app)

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
# DATABASE_URL = os.environ['DATABASE_URL']
# conn = psycopg2.connect(DATABASE_URL, sslmode='require')
conn = psycopg2.connect("postgres://qlcewgcgtwwthu:4550e7f167077a3f1b102300b99b050ec253eecb9aba406c414cf104a3a94fe3@ec2-52-212-228-71.eu-west-1.compute.amazonaws.com:5432/d9tbqum2i1r382")
db = conn.cursor()

@app.route("/api", methods=["GET", "POST"])
@cross_origin()
def index():
    if request.method == "POST":
        # get data from request
        wordArr, selectedWord, hardModeOn = request.json["word"], request.json["selectedWord"].lower(), request.json["hardModeOn"]
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
        
        if currentWord != selectedWord:
            wordArr = HelpFunc.check_word(wordArr, selectedWord, currentWord)
            return json.dumps({"status": "success", "wordArr": wordArr})

    elif request.method == "GET":
        # create game arr
        wordsArr = [[] for x in range(6)]
        for i in range(6):
            for k in range(5):
                wordsArr[i].append({"letter": "", "color": ""})
        
        selectedWord, wordCount = HelpFunc.generate_word(db, conn)
        
        return json.dumps({"wordsArr": wordsArr, "selectedWord": selectedWord, "wordCount": wordCount})

@app.route("/")
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)