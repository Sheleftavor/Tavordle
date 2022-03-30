import './css/App.css';
import React from 'react';
import Header from './Components/Header';
import SettingsModal from './Components/settingsModal';
import Board from './Components/Board';
import Keyboard from './Components/Keyboard';

const languages = [
  { value: 'En', label: 'En' },
  { value: 'He', label: 'He' }
]

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      settingsModalVisible: false,
      darkThemeOn: true,
      hardModeOn: false,
      selectedLanguage: languages[0],
      wordsArr: ["ccoll", "kllkl", "", "", "", ""],
      wordsNum: 2,
      selectedWord: "flick"
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

  render() {
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
          />

          <Keyboard />
        </div>
      </div>
    );
  }
}
