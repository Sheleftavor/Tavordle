from flask import session
from datetime import datetime
import random

# function for getting all the 5 letter words from words list
def get_words():
    with open('usa.txt', 'r') as in_file, open('Words.txt', 'w') as out_file:
        for line in in_file:
            line = line.replace("\n", "")
            if len(line) == 5 and line.isalpha():
                out_file.write(line.lower() + "\n")

# check word and return what color each letter is
def check_word(wordArr, selectedWord, currentWord):
    # run on each letter
    for i in range(len(wordArr)):
        # if letter matches
        if wordArr[i]["letter"].lower() == selectedWord[i]:
            wordArr[i]["color"] = "Green"
            continue
        # if letter is in word
        elif wordArr[i]["letter"].lower() in selectedWord:
            # check how many times the letter is in the guessed word and how many times the letter is in the selected word
            currentWordCount = 0 # currentWord.count(wordArr[i]["letter"].lower())
            selectedWordCount = 0 #selectedWord.count(wordArr[i]["letter"].lower())

            letter = wordArr[i]["letter"].lower()
            
            for j in range(5):
                if currentWord[j] == letter and letter != selectedWord[j]:
                    currentWordCount += 1
                if selectedWord[j] == letter and letter != currentWord[j]:
                    selectedWordCount += 1
            
            if selectedWordCount > 0 and currentWordCount > selectedWordCount:
                # check if there is a same letter beforehand that is orange and if so dont make the current one orange
                exists = False
                for k in range(i):
                    if (currentWord[k] == wordArr[i]["letter"].lower() and wordArr[i]["letter"].lower() != selectedWord[k]):
                        exists = True

                if not exists:
                    wordArr[i]["color"] = "Orange"
                    continue
            elif (selectedWordCount >= currentWordCount):
                wordArr[i]["color"] = "Orange"
                continue
                
        wordArr[i]["color"] = "Black"
    
    return wordArr

def generate_word(db, conn):
    # check if todays word have already been generated
    today = datetime.today().strftime("%Y-%m-%d")
    db.execute("SELECT word, id FROM words WHERE date = %s", (today,))
    
    wordData = db.fetchone()
    # if word have been generated already
    if wordData is not None:
        return wordData
    
    # if not
    # generate new word
    with open("Words.txt") as f:
        lines = f.readlines()
        # generate new words until the word have not been used before
        wordExists = not None
        while wordExists is not None:
            newWord = lines[random.randint(0, len(lines) - 1)].replace("\n", "")
            # check if word have been used before
            db.execute("SELECT * FROM words WHERE word = %s", (newWord,))
            wordExists = db.fetchone()
                
        # insert into db and get id number of word
        db.execute("INSERT INTO words (word, date) VALUES (%s, %s) RETURNING id", (newWord, today))
        id = db.fetchone()[0]
        conn.commit()
    
    return [newWord, id]

def create_wordsArr():
    wordsArr = [[] for x in range(6)]
    for i in range(6):
        for k in range(5):
            wordsArr[i].append({"letter": "", "color": ""})
    return wordsArr

def get_wins_percentage(stats):
    total_games = stats[2]
    games = stats[3]
    return int(sum(games) / total_games * 100)

def get_stats(db):
    stats = {}
    if session.get("user_id") is not None:
        db.execute("SELECT current_streak, max_streak, total_games, games FROM users WHERE id = %s", (session["user_id"],))
        stats_tmp = db.fetchone()
        stats["current_streak"] = stats_tmp[0]
        stats["max_streak"] = stats_tmp[1]
        stats["total_games"] = stats_tmp[2]
        stats["games"] = stats_tmp[3]
        stats["wins_percentage"] = get_wins_percentage(stats_tmp)
    else:
        stats["current_streak"] = 0
        stats["max_streak"] = 0
        stats["total_games"] = 0
        stats["games"] = [0 for i in range(6)]
        stats["wins_percentage"] = 0
    return stats
