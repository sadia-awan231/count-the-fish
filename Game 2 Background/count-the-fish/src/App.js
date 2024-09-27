import React from 'react';
import Game from './components/game.js';
import WaveAnimation from './components/WavesAnimation.js';


function App() {
  return (
    <div className="App">
      <WaveAnimation />
      <Game />
    </div>
  );
}

export default App;
