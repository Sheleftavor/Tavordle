import React, {useEffect} from "react";
import Select from 'react-select';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Switch from "react-switch";
import '../css/settingsModal.css'

const languages = [
    { value: 'En', label: 'En' },
    { value: 'He', label: 'He' }
]
  
const customStyles = {
    control: (base, state) => ({
      ...base,
      background: backgroundColor,
      color: fontColor
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "#fff" : "#161616"
    }),
    dropDownIndicator: (base, state) => ({
      ...base,
      color: fontColor
    }),
    singleValue: (base, state) => ({
      ...base,
      color: fontColor
    }),
}
  
var fontColor = "#fff"
var backgroundColor = "#161616"

export default class SettingsModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            darkThemeOn: true
        }

        Modal.setAppElement('body');
    }

    toggleDarkTheme = () => {
        // flip background color and text color 
        if (this.state.darkThemeOn) {
          document.querySelector(':root').style.setProperty('--background', '#fff')
          document.querySelector(':root').style.setProperty('--fontColor', '#161616')
          backgroundColor = "#fff"
          fontColor = "#161616"
        }
        else {
          document.querySelector(':root').style.setProperty('--background', '#161616')
          document.querySelector(':root').style.setProperty('--fontColor', '#fff')
          backgroundColor = "#161616"
          fontColor = "#fff"
        }
    
        this.setState(prevstate => ({darkThemeOn: !prevstate.darkThemeOn}))
    }

    render() {
        return (
            <Modal
              closeTimeoutMS={400}
              isOpen={this.props.settingsModalVisible}
              onRequestClose={() => this.props.toggleModal("settingsModalVisible")}
              className="settingsModal"
              centered
            >
              <div className='modalHeader'>
                SETTINGS
                <FontAwesomeIcon icon={faXmark} className="exitModal" onClick={() => this.props.toggleModal("settingsModalVisible")} />
              </div>
    
              <div className='settingsModalBody'>
                <div className='settingsItem'>
                  <div className='settingsText'>
                    <div className='settingsTitle'>Language</div>
                  </div>
                  <Select
                    value={this.props.selectedLanguage}
                    options={languages}
                    onChange={this.props.changeLanguage}
                    className="settingsModalSelect"
                    styles={customStyles}
                  />
                </div>
                <div className='settingsItem'>
                  <div className='settingsText'>
                    <div className='settingsTitle'>Dark Theme</div>
                  </div>
                  <Switch
                    onChange={this.toggleDarkTheme}
                    checked={this.state.darkThemeOn}
                    className="settingsSwitch"
                    uncheckedIcon={false}
                    checkedIcon={false}
                    width={32}
                    height={20}
                  />
                </div>
                <div className='settingsItem'>
                  <div className='settingsText'>
                    <div className='settingsTitle'>Hard Mode</div>
                    <div className='settingsDesc'>Any revealed hints must be used in subsequent guesses</div>
                  </div>
                  <Switch
                    onChange={this.props.toggleHardMode}
                    checked={this.props.hardModeOn}
                    className="settingsSwitch"
                    uncheckedIcon={false}
                    checkedIcon={false}
                    width={32}
                    height={20}
                  />
                </div>
              </div>
    
              <div className='settingsModalFooter'>
                <a className='settingsModalFooterCreator' target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/shelef-tavor-40183520b/">Built & Designed By Shelef Tavor</a>
              <div className='settingsModalFooterNumber'>#{this.props.wordCount}</div>
              </div>
            </Modal>
        )
    }
}

