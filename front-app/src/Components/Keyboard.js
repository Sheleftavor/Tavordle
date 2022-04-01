import React from "react";
import "../css/Keyboard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'

export default class Keyboard extends React.Component {
    constructor(props) {
        super(props)

        this.blackLettersArr = []
        this.orangeLettersArr = []
        this.greenLettersArr = []
    }

    

    getColor = (c) => {
        console.log(this.blackLettersArr)
        if (this.greenLettersArr.includes(c))
            return "letterK letterK-green"
        else if (this.orangeLettersArr.includes(c))
            return "letterK letterK-orange"
        else if (this.blackLettersArr.includes(c))
            return "letterK letterK-black"
        else
            return "letterK"
    }

    render() {
        // get an array of guessed letters colors and paint keyboard
        for (let i = 0; i <= this.props.wordsNum; i++){
            for (let j = 0; j < 5; j++){
                if (this.props.wordsArr[i][j]["color"] === "Green")
                    this.greenLettersArr.push(this.props.wordsArr[i][j]["letter"])
                else if (this.props.wordsArr[i][j]["color"] === "Orange")
                    this.orangeLettersArr.push(this.props.wordsArr[i][j]["letter"])
                else if (this.props.wordsArr[i][j]["color"] === "Black")
                    this.blackLettersArr.push(this.props.wordsArr[i][j]["letter"])
            }   
        }

        return (
            <div className="containerK">
                <div className="rowK">
                    <button className={this.getColor("Q")}  onClick={() => this.props.handleKeyboard("Q")}>Q</button>
                    <button className={this.getColor("W")}  onClick={() => this.props.handleKeyboard("W")}>W</button>
                    <button className={this.getColor("E")}  onClick={() => this.props.handleKeyboard("E")}>E</button>
                    <button className={this.getColor("R")}  onClick={() => this.props.handleKeyboard("R")}>R</button>
                    <button className={this.getColor("T")}  onClick={() => this.props.handleKeyboard("T")}>T</button>
                    <button className={this.getColor("Y")}  onClick={() => this.props.handleKeyboard("Y")}>Y</button>
                    <button className={this.getColor("U")}  onClick={() => this.props.handleKeyboard("U")}>U</button>
                    <button className={this.getColor("I")}  onClick={() => this.props.handleKeyboard("I")}>I</button>
                    <button className={this.getColor("O")}  onClick={() => this.props.handleKeyboard("O")}>O</button>
                    <button className={this.getColor("P")}  onClick={() => this.props.handleKeyboard("P")}>P</button>
                </div>
                <div className="rowK">
                    <div className="rowSpacer"></div>
                    <button className={this.getColor("A")}  onClick={() => this.props.handleKeyboard("A")}>A</button>
                    <button className={this.getColor("S")}  onClick={() => this.props.handleKeyboard("S")}>S</button>
                    <button className={this.getColor("D")}  onClick={() => this.props.handleKeyboard("D")}>D</button>
                    <button className={this.getColor("F")}  onClick={() => this.props.handleKeyboard("F")}>F</button>
                    <button className={this.getColor("G")}  onClick={() => this.props.handleKeyboard("G")}>G</button>
                    <button className={this.getColor("H")}  onClick={() => this.props.handleKeyboard("H")}>H</button>
                    <button className={this.getColor("J")}  onClick={() => this.props.handleKeyboard("J")}>J</button>
                    <button className={this.getColor("K")}  onClick={() => this.props.handleKeyboard("K")}>K</button>
                    <button className={this.getColor("L")}  onClick={() => this.props.handleKeyboard("L")}>L</button>
                    <div className="rowSpacer"></div>
                </div>
                <div className="rowK">
                    <div className="letterK letterEnter" onClick={() => this.props.handleKeyboard("Enter")}>ENTER</div>
                    <button className={this.getColor("Z")}  onClick={() => this.props.handleKeyboard("Z")}>Z</button>
                    <button className={this.getColor("X")}  onClick={() => this.props.handleKeyboard("X")}>X</button>
                    <button className={this.getColor("C")}  onClick={() => this.props.handleKeyboard("C")}>C</button>
                    <button className={this.getColor("V")}  onClick={() => this.props.handleKeyboard("V")}>V</button>
                    <button className={this.getColor("B")}  onClick={() => this.props.handleKeyboard("B")}>B</button>
                    <button className={this.getColor("N")}  onClick={() => this.props.handleKeyboard("N")}>N</button>
                    <button className={this.getColor("M")}  onClick={() => this.props.handleKeyboard("M")}>M</button>
                    <div className="letterK letterEnter" onClick={() => this.props.handleKeyboard("Delete")}><FontAwesomeIcon icon={faDeleteLeft} size="xl" /></div>
                </div>
            </div>
        )
    }
}
