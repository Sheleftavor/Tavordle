import React from "react";
import "../css/Board.css";

const Board = (props) => {
    return (
        <div className="container">
            <div className="board">
                {[...Array(6)].map((x, i) => {
                    // word already guessed
                    if (i < props.wordsNum) {
                        let word = props.wordsArr[i]
                        return (
                            <div className="boardRow" key={i}>{Array.prototype.map.call(word, (letter, k) => {
                                // if letters match
                                if (letter === props.selectedWord[k]){
                                    return (<div className="boardItem boardItemGreen" key={k}>{letter}</div>)
                                }
                                // if letter is in word
                                else if (props.selectedWord.includes(letter)) {
                                    // check how many times the letter is guesses and not matched 
                                    let count1 = 0, count2 = 0 
                                    for (let c = 0; c < 5; c++) {
                                        if (word[c] === letter)
                                            count1++;
                                        if (props.selectedWord[c] === letter && props.selectedWord[c] !== word[c])
                                            count2++
                                    }
                                    // if non matched same letters guessed more than there is in the word
                                    if (count1 > count2 && count2 > 0) {
                                        // check if there is a same letter beforehand that is orange and if so dont make the current one orange
                                        let exists = false
                                        for (let c = 0; c < k; c++) {
                                            if (word[c] === letter && letter !== props.selectedWord[c]) {
                                                exists = true
                                            }
                                        }
                                        if (!exists)
                                            return (<div className="boardItem boardItemOrange" key={k}>{letter}</div>)
                                    }
                                    else if (count1 <= count2 && count2 > 0)
                                        return (<div className="boardItem boardItemOrange" key={k}>{letter}</div>)
                                }
                                // letter is not in word
                                return ( <div className="boardItem boardItemBlack" key={k}>{letter}</div> )
                            })}</div>
                        )
                    }
                    // current word
                    else if (i === props.wordsNum) {
                        let word = props.wordsArr[i]
                        // add spaces to word to fill the 5 boxes
                        if (word.length < 5) 
                            word += " ".repeat(5 - word.length)
                        else if (word.length > 5)
                            word = word.slice(0, 5)
                        return (
                            <div className="boardRow" key={i}>{Array.prototype.map.call(word, (x, k) => (<div className="boardItem" key={k}>{x}</div>))}</div>
                        )
                    }
                    // blank word
                    else {
                        return (
                            <div className="boardRow" key={i}>{[...Array(5)].map((x, k) => (<div className="boardItem" key={k}></div>))}</div>
                        )
                    }
                }
                )}

                {/* <div className="boardRow">
                    <div className="boardItem">
                    </div>
                    <div className="boardItem">
                    </div>
                    <div className="boardItem">
                    </div>
                    <div className="boardItem">
                    </div>
                    <div className="boardItem">
                    </div>
                </div>
                <div className="boardRow">
                    <div className="boardItem">
                    </div>
                    <div className="boardItem">
                    </div>
                    <div className="boardItem">
                    </div>
                    <div className="boardItem">
                    </div>
                    <div className="boardItem">
                    </div>
                </div>
                <div className="boardRow">
                    <div className="boardItem">
                    </div>
                    <div className="boardItem">
                    </div>
                    <div className="boardItem">
                    </div>
                    <div className="boardItem">
                    </div>
                    <div className="boardItem">
                    </div>
                </div>
                <div className="boardRow">
                    <div className="boardItem">
                    </div>
                    <div className="boardItem">
                    </div>
                    <div className="boardItem">
                    </div>
                    <div className="boardItem">
                    </div>
                    <div className="boardItem">
                    </div>
                </div>
                <div className="boardRow">
                    <div className="boardItem">
                    </div>
                    <div className="boardItem">
                    </div>
                    <div className="boardItem">
                    </div>
                    <div className="boardItem">
                    </div>
                    <div className="boardItem">
                    </div>
                </div>
                <div className="boardRow">
                    <div className="boardItem">
                    </div>
                    <div className="boardItem">
                    </div>
                    <div className="boardItem">
                    </div>
                    <div className="boardItem">
                    </div>
                    <div className="boardItem">
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Board