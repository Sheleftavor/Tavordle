# function for getting all the 5 letter words from words list
def get_words():
    with open('words-big.txt', 'r') as in_file, open('Words.txt', 'w') as out_file:
        for line in in_file:
            line = line.replace("\n", "")
            if len(line) == 5 and line.isalpha():
                out_file.write(line + "\n")

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
            currentWordCount = currentWord.count(wordArr[i]["letter"].lower())
            selectedWordCount = selectedWord.count(wordArr[i]["letter"].lower())
            print(currentWordCount, selectedWordCount)
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
    