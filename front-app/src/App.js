import './css/App.css';
import React from 'react';
import Header from './Components/Header';
import SettingsModal from './Components/settingsModal';
import Board from './Components/Board';
import Keyboard from './Components/Keyboard';
import Popup from './Components/Popup';
import { getData, handleWord } from './api';

const languages = [
  { value: 'En', label: 'En' },
  { value: 'He', label: 'He' }
]

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      boardLoaded: false,
      settingsModalVisible: false,
      darkThemeOn: true,
      hardModeOn: false,
      selectedLanguage: languages[0],
      wordsArr: "",
      wordsNum: 0,
      selectedWord: "",
      shakeBoard: false,
      errorMessage: "",
      wordCount: 0
    }
  }

  componentDidMount() {
    this.getWords()
  }

  getWords = async () => {
    try {
      const result = await getData()
      this.setState({
        wordsArr: result["wordsArr"],
        selectedWord: result["selectedWord"],
        wordCount: result["wordCount"],
        boardLoaded: true
      })

    } catch (err) {
      const errMessage = err.message
    }
  }

  toggleSettingModal(name) {
    this.setState(prevstate => ({ [name]: !prevstate[name] }))
  }

  toggleHardMode = () => {
    this.setState(prevstate => ({hardModeOn: !prevstate.hardModeOn}))
  }

  changeLanguage = (value) => {
    this.setState({selectedLanguage: value})
  }

  handleKeyboard = (key) => {
    let currentWord = this.state.wordsArr[this.state.wordsNum]
    // add key to current work
    if (key !== "Enter" && key !== "Delete") {
      // check where to place letter
      let i = 0;
      while (i < 5 && currentWord[i]["letter"] !== "")
        i++;
      if (i < 5)
        currentWord[i]["letter"] = key
    }
    // backspace
    else if (key === "Delete") {
      // get last letter and delete it
      let i = 0;
      while (i < 5 && currentWord[i]["letter"] !== "")
        i++;
      if (i > 0)
        currentWord[i - 1]["letter"] = ""
    }
    else if (key === "Enter") {
      // if word does not have 5 letter the last letter will be empty
      if (currentWord[4]["letter"] === "") {
        // shake row
        this.shakeRow("Word not full")
      }
      else {
        this.checkWord()
      }
    }
    // set word
    let wordsArr = this.state.wordsArr
    wordsArr[this.state.wordsNum] = currentWord
    this.setState({wordsArr})
  }

  checkWord = async () => {
    try {
      const result = await handleWord(this.state.wordsArr[this.state.wordsNum], this.state.selectedWord, this.state.hardModeOn)
      if (result["status"] === "error") {
        // shake row
        this.shakeRow(result["message"])
      }
      else {
        let wordsArrTmp = this.state.wordsArr
        wordsArrTmp[this.state.wordsNum] = result["wordArr"]
        this.setState(prevstate => ({wordsArr: wordsArrTmp, wordsNum: prevstate.wordsNum + 1}))
      }
        
    } catch (err) {
        const errMessage = err.message
    }
  }

  shakeRow = (message) => {
    this.setState({ shakeBoard: true, errorMessage: message })
    document.getElementById("popup").classList.add("showPopup")
    setTimeout(() => {
      this.setState({ shakeBoard: false })
      document.getElementById("popup").classList.remove("showPopup")
      }, 750)
  }

  render() {
    if (this.state.boardLoaded) {
      return (
        <div className="App">
          <Header openModal={() => this.toggleSettingModal("settingsModalVisible")} />

          <SettingsModal
            {...this.state}
            changeLanguage={this.changeLanguage}
            toggleSettingModal={() => this.toggleSettingModal("settingsModalVisible")}
            toggleHardMode={this.toggleHardMode}
          />
        
          <div className='gameContainer'>
            <Board
              wordsArr={this.state.wordsArr}
              wordsNum={this.state.wordsNum}
              selectedWord={this.state.selectedWord}
              shakeBoard={this.state.shakeBoard}
            />

            <Keyboard handleKeyboard={this.handleKeyboard} wordsArr={this.state.wordsArr} wordsNum={this.state.wordsNum} />
          </div>

          <Popup errorMessage={this.state.errorMessage} />
        </div>
      );
    }
    else {
      return(<></>)
    }
  }
}
