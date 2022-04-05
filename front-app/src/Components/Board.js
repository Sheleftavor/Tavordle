import React from "react";
import "../css/Board.css";

const Board = (props) => {
    return (
        <div className="container">
            <div className="board">
                {[...Array(6)].map((x, i) => {
                    // word already guessed
                    if (i < props.wordsNum || (i === props.wordsNum && props.gameFinished)) {
                        const word = props.wordsArr[i]
                        return (
                            <div className="boardRow" key={i}>{word.map((letter, k) => {
                                let classNames = "boardItem boardItem" + letter["color"]
                                return (<div className={classNames} key={k}>{letter["letter"]}</div>)
                            })}</div>
                        )
                    }
                    // current word
                    else if (i === props.wordsNum) {
                        const word = props.wordsArr[i]
                        return (
                            <div className={props.shakeBoard ? "boardRow shakeBoard" : "boardRow"} key={i}>{word.map((x, k) => (<div className="boardItem" key={k}>{x["letter"]}</div>))}</div>
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
            </div>
        </div>
    )
}

export default Board