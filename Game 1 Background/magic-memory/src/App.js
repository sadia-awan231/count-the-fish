import React from 'react';
import './App.css';
import Game from './components/Game.js';
import AnimatedBackground from './components/AnimatedBackground.js';
import gameBackground from './components/gameBackground.js';


function App() {
  return (
    <div className="App">
      <gameBackground/>
      <AnimatedBackground  className="AnimatedBackground"/>
      <Game />
    </div>
  );
}

export default App;
