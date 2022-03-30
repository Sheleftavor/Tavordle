import React from "react";
import "../css/Keyboard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'

const Keyboard = (props) => {
    return (
        <div className="containerK">
            <div className="rowK">
                <button className="letterK" onClick={() => props.handleKeyboard("Q")}>Q</button>
                <button className="letterK" onClick={() => props.handleKeyboard("W")}>W</button>
                <button className="letterK" onClick={() => props.handleKeyboard("E")}>E</button>
                <button className="letterK" onClick={() => props.handleKeyboard("R")}>R</button>
                <button className="letterK" onClick={() => props.handleKeyboard("T")}>T</button>
                <button className="letterK" onClick={() => props.handleKeyboard("Y")}>Y</button>
                <button className="letterK" onClick={() => props.handleKeyboard("U")}>U</button>
                <button className="letterK" onClick={() => props.handleKeyboard("I")}>I</button>
                <button className="letterK" onClick={() => props.handleKeyboard("O")}>O</button>
                <button className="letterK" onClick={() => props.handleKeyboard("P")}>P</button>
            </div>
            <div className="rowK">
                <div className="rowSpacer"></div>
                <button className="letterK" onClick={() => props.handleKeyboard("A")}>A</button>
                <button className="letterK" onClick={() => props.handleKeyboard("S")}>S</button>
                <button className="letterK" onClick={() => props.handleKeyboard("D")}>D</button>
                <button className="letterK" onClick={() => props.handleKeyboard("F")}>F</button>
                <button className="letterK" onClick={() => props.handleKeyboard("G")}>G</button>
                <button className="letterK" onClick={() => props.handleKeyboard("H")}>H</button>
                <button className="letterK" onClick={() => props.handleKeyboard("J")}>J</button>
                <button className="letterK" onClick={() => props.handleKeyboard("K")}>K</button>
                <button className="letterK" onClick={() => props.handleKeyboard("L")}>L</button>
                <div className="rowSpacer"></div>
            </div>
            <div className="rowK">
                <div className="letterK letterEnter" onClick={() => props.handleKeyboard("Enter")}>ENTER</div>
                <button className="letterK" onClick={() => props.handleKeyboard("Z")}>Z</button>
                <button className="letterK" onClick={() => props.handleKeyboard("X")}>X</button>
                <button className="letterK" onClick={() => props.handleKeyboard("C")}>C</button>
                <button className="letterK" onClick={() => props.handleKeyboard("V")}>V</button>
                <button className="letterK" onClick={() => props.handleKeyboard("B")}>B</button>
                <button className="letterK" onClick={() => props.handleKeyboard("N")}>N</button>
                <button className="letterK" onClick={() => props.handleKeyboard("M")}>M</button>
                <div className="letterK letterEnter" onClick={() => props.handleKeyboard("Delete")}><FontAwesomeIcon icon={faDeleteLeft} size="xl" /></div>
            </div>
        </div>
    )
}

export default Keyboard