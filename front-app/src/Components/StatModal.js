import React from "react";
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import '../css/StatModal.css'

const copyClip = (wordsArr, wordCount, wordsNum, wordGuessed) => {
    var message = `Tavordle ${wordCount} ${wordGuessed ? wordsNum + 1 : "X"}/6 \n\n`

    for (let i = 0; i <= wordsNum; i++) {
        let row = ''
        for (let k = 0; k < 5; k++){
            switch (wordsArr[i][k].color) {
                case "Green":
                    row += "🟩"
                    break
                case "Orange":
                    row += "🟨"
                    break
                case "Black":
                    row += "⬛"
                    break
                default:
                    break
            }
        }
        message += row + "\n"
    }
    navigator.clipboard.writeText(message)
}

const StatModal = (props) => {
    const max_guess = Math.max(...props.stats.games)

    return (
        <Modal
            closeTimeoutMS={400}
            isOpen={props.statModalVisible}
            onRequestClose={() => props.toggleModal("statModalVisible")}
            className="statModal"
        >
            <div className='modalHeader'>
                STATISTICS
                <FontAwesomeIcon icon={faXmark} className="exitModal" onClick={() => props.toggleModal("statModalVisible")} />
            </div>

            <div className="statBody">
                <div className="statItem">
                    <div className="statItemNumber">
                        {props.stats.total_games}
                    </div>
                    <div className="statItemTitle">
                        Played
                    </div>
                </div>
                <div className="statItem">
                    <div className="statItemNumber">
                        {props.stats.wins_percentage}
                    </div>
                    <div className="statItemTitle">
                        Win %
                    </div>
                </div>
                <div className="statItem">
                    <div className="statItemNumber">
                        {props.stats.current_streak}
                    </div>
                    <div className="statItemTitle">
                        Current Streak
                    </div>
                </div>
                <div className="statItem">
                    <div className="statItemNumber">
                        {props.stats.max_streak}
                    </div>
                    <div className="statItemTitle">
                        Max Streak
                    </div>
                </div>
            </div>

            <div className='modalHeader'>
                GUESS DISTRIBUTION
            </div>

            <div className="guessDistribution">
                {[...Array(6).keys()].map(i => {
                    var className = "graph-bar"
                    var barWidth = "7%"
                    // if game finished and word was guessed
                    if (props.gameFinished && props.wordGuessed && i === props.wordsNum)
                        className += " green-graph"
                    if (props.stats.games[i] !== 0) {
                        className += " align-graph"
                        barWidth = parseInt(props.stats.games[i] / max_guess * 100) + "%"
                    }
                        
                    return (
                        <div className="graphContainer" key={i}>
                            <div className="guess">{i + 1}</div>
                            <div className="graph">
                                <div className={className} style={{ width: barWidth }}>
                                    <div className="num-guesses">{props.stats.games[i]}</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {props.gameFinished && (
                <div className="statsFooter">
                    <div className="footerNextWordle">
                        <div className="footerText">NEXT WORDLE</div>
                        <div className="countdown">{props.countdown}</div>
                    </div>
                    <div className="footerShare">
                        <button className="shareButton" onClick={() => copyClip(props.wordsArr, props.wordCount, props.wordsNum, props.wordGuessed)}>
                            Share
                            <FontAwesomeIcon icon={faShareNodes} style={{marginLeft: '5px'}} />
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    )
}

export default StatModal