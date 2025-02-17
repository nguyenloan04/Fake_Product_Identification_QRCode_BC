import React from 'react';
import logo from './logo.svg';
import './App.css';
import TokenMaster from './abis/MainSystem.json'
function App() {
  // <div>
  //   <header>
  //
  //     <h2 className="header__title"><strong>Welcome to My App</strong></h2>
  //   </header>
  //
  // </div>

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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
