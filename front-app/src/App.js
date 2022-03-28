import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';

function App() {
  const [state, setState] = useState({})

  useEffect(() => {
    fetch("https://tavordle.herokuapp.com/api").then(response => {
      if(response.status == 200){
        return response.json()
      }
    }).then(data => console.log(data))
    .then(error => console.log(error))
  },[])

  return (
    <div className="App">
      <div></div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
