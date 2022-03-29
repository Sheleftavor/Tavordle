import './css/App.css';
import React from 'react';
import Header from './Components/Header';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Switch from "react-switch";
import SettingsModal from './Components/settingsModal';

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
        
      </div>
    );
  }
}
