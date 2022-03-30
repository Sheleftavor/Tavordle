# function for getting all the 5 letter words from words list
def get_words():
    with open('words-big.txt', 'r') as in_file, open('Words.txt', 'w') as out_file:
        for line in in_file:
            line = line.replace("\n", "")
            if len(line) == 5 and line.isalpha():
                out_file.write(line + "\n")
                
if __name__ == "__main__":
    get_words()