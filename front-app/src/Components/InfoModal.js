import React from "react";
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import '../css/InfoModal.css'

const InfoModal = (props) => {
    return (
        <Modal
            closeTimeoutMS={400}
            isOpen={props.infoModalVisible}
            onRequestClose={() => props.toggleModal("infoModalVisible")}
            className="infoModal"
        >
            <div className="infoModalBody">
                <div className='modalHeader'>
                    HOW TO PLAY
                    <FontAwesomeIcon icon={faXmark} className="exitModal" onClick={() => props.toggleModal("infoModalVisible")} />
                </div>
                <p className="infoText">Guess the <strong>TAVORDLE</strong> in six tries.</p>
                <p className="infoText">Each guess must be a valid five-letter word. Hit the enter button to submit.</p>
                <p className="infoText">After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
                
                <div className="infoExamplesContainer">
                    <p className="infoText"><strong>Examples</strong></p>
                    <div className="exampleBox">
                        <div className="exampleItem" style={{border: "none", backgroundColor: "#538d4e"}}>t</div>
                        <div className="exampleItem">a</div>
                        <div className="exampleItem">b</div>
                        <div className="exampleItem">l</div>
                        <div className="exampleItem">e</div>
                    </div>

                    <p className="infoText">The letter <strong>T</strong> is in the word and in the correct spot.</p>

                    <div className="exampleBox">
                        <div className="exampleItem">w</div>
                        <div className="exampleItem">a</div>
                        <div className="exampleItem">t</div>
                        <div className="exampleItem" style={{border: "none", backgroundColor: "#b59f3b"}}>c</div>
                        <div className="exampleItem">h</div>
                    </div>

                    <p className="infoText">The letter <strong>C</strong> is in the word but in the wrong spot.</p>

                    <div className="exampleBox">
                        <div className="exampleItem">p</div>
                        <div className="exampleItem" style={{border: "none", backgroundColor: "#636363"}}>l</div>
                        <div className="exampleItem">a</div>
                        <div className="exampleItem">i</div>
                        <div className="exampleItem">d</div>
                    </div>

                    <p className="infoText">The letter <strong>L</strong> is not in the word.</p>
                </div>

                <p className="infoText"><strong>A new TAVORDLE will be available each day!</strong></p>
            </div>

        </Modal>
    )
}

export default InfoModal