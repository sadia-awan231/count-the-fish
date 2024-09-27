import React, { useEffect, useState } from 'react';
import './Game.css';
import SingleCard from './SingleCard';
import axios from 'axios';
import AnimatedBackground from './AnimatedBackground';
import MusicComponent from './music.js';

const levels = [
  // Level 1
  [
    {"src":"/img/2.jpg", matched: false},
    {"src":"/img/3.jpg", matched: false},
  ],
  // Level 2
  [
    {"src":"/img/2.jpg", matched: false},
    {"src":"/img/3.jpg", matched: false},
    {"src":"/img/4.jpg", matched: false},
    {"src":"/img/5.jpg", matched: false},
  ],
  // Level 3
  [
    {"src":"/img/2.jpg", matched: false},
    {"src":"/img/3.jpg", matched: false},
    {"src":"/img/4.jpg", matched: false},
    {"src":"/img/5.jpg", matched: false},
    {"src":"/img/6.jpg", matched: false},
    {"src":"/img/7.jpg", matched: false},

  ],
  // Level 4
  [
    {"src":"/img/2.jpg", matched: false},
    {"src":"/img/3.jpg", matched: false},
    {"src":"/img/4.jpg", matched: false},
    {"src":"/img/5.jpg", matched: false},
    {"src":"/img/6.jpg", matched: false},
    {"src":"/img/7.jpg", matched: false},
    {"src":"/img/8.jpg", matched: false},
    {"src":"/img/9.jpg", matched: false},
  ],
  // Level 5
  [
    {"src":"/img/2.jpg", matched: false},
    {"src":"/img/3.jpg", matched: false},
    {"src":"/img/4.jpg", matched: false},
    {"src":"/img/5.jpg", matched: false},
    {"src":"/img/6.jpg", matched: false},
    {"src":"/img/7.jpg", matched: false},
    {"src":"/img/8.jpg", matched: false},
    {"src":"/img/9.jpg", matched: false},
  ],
  // Level 6
  [
    {"src":"/img/2.jpg", matched: false},
    {"src":"/img/3.jpg", matched: false},
    {"src":"/img/4.jpg", matched: false},
    {"src":"/img/5.jpg", matched: false},
    {"src":"/img/6.jpg", matched: false},
    {"src":"/img/7.jpg", matched: false},
    {"src":"/img/8.jpg", matched: false},
    {"src":"/img/9.jpg", matched: false},
    {"src":"/img/10.jpg", matched: false},
    {"src":"/img/11.jpg", matched: false},
  ],
  // Level 7
  [
    {"src":"/img/2.jpg", matched: false},
    {"src":"/img/3.jpg", matched: false},
    {"src":"/img/4.jpg", matched: false},
    {"src":"/img/5.jpg", matched: false},
    {"src":"/img/6.jpg", matched: false},
    {"src":"/img/7.jpg", matched: false},
    {"src":"/img/8.jpg", matched: false},
    {"src":"/img/9.jpg", matched: false},
    {"src":"/img/10.jpg", matched: false},
    {"src":"/img/11.jpg", matched: false},
    {"src":"/img/12.jpg", matched: false},
    {"src":"/img/13.jpg", matched: false},
  ],

  // Level 8
  [
    {"src":"/img/2.jpg", matched: false},
    {"src":"/img/3.jpg", matched: false},
    {"src":"/img/4.jpg", matched: false},
    {"src":"/img/5.jpg", matched: false},
    {"src":"/img/6.jpg", matched: false},
    {"src":"/img/7.jpg", matched: false},
    {"src":"/img/8.jpg", matched: false},
    {"src":"/img/9.jpg", matched: false},
    {"src":"/img/10.jpg", matched: false},
    {"src":"/img/11.jpg", matched: false},
    {"src":"/img/12.jpg", matched: false},
    {"src":"/img/13.jpg", matched: false},
    {"src":"/img/14.jpg", matched: false},
    {"src":"/img/15.jpg", matched: false},
    
  ],

  // Level 9
  [
    {"src":"/img/2.jpg", matched: false},
    {"src":"/img/3.jpg", matched: false},
    {"src":"/img/4.jpg", matched: false},
    {"src":"/img/5.jpg", matched: false},
    {"src":"/img/6.jpg", matched: false},
    {"src":"/img/7.jpg", matched: false},
    {"src":"/img/8.jpg", matched: false},
    {"src":"/img/9.jpg", matched: false},
    {"src":"/img/10.jpg", matched: false},
    {"src":"/img/11.jpg", matched: false},
    {"src":"/img/12.jpg", matched: false},
    {"src":"/img/13.jpg", matched: false},
    {"src":"/img/14.jpg", matched: false},
    {"src":"/img/15.jpg", matched: false},
    {"src":"/img/16.jpg", matched: false},
    {"src":"/img/17.jpg", matched: false},
  ],
  // Level 10
  [
    {"src":"/img/2.jpg", matched: false},
    {"src":"/img/3.jpg", matched: false},
    {"src":"/img/4.jpg", matched: false},
    {"src":"/img/5.jpg", matched: false},
    {"src":"/img/6.jpg", matched: false},
    {"src":"/img/7.jpg", matched: false},
    {"src":"/img/8.jpg", matched: false},
    {"src":"/img/9.jpg", matched: false},
    {"src":"/img/10.jpg", matched: false},
    {"src":"/img/11.jpg", matched: false},
    {"src":"/img/12.jpg", matched: false},
    {"src":"/img/13.jpg", matched: false},
    {"src":"/img/14.jpg", matched: false},
    {"src":"/img/15.jpg", matched: false},
    {"src":"/img/16.jpg", matched: false},
    {"src":"/img/17.jpg", matched: false},
    {"src":"/img/18.jpg", matched: false},
    {"src":"/img/19.jpg", matched: false},

  ],

];

function Game() {
  const [level, setLevel] = useState(0);
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [score, setScore] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [history, setHistory] = useState([]);
  const [time, setTime] = useState(0);
  const [levelTime, setLevelTime] = useState(0);
  const [levelStartTime, setLevelStartTime] = useState(Date.now());
  const [completionMessage, setCompletionMessage] = useState('');
  const [transitioning, setTransitioning] = useState(false);

  const shuffleCards = () => {
    const currentLevelCards = levels[level];
    const shuffledCards = [...currentLevelCards, ...currentLevelCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setLevelTime(0);
    setLevelStartTime(Date.now());
    setTransitioning(false);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        setScore((prevScore) => prevScore + 10);
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (cards.length && cards.every(card => card.matched)) {
      if (level < levels.length - 1) {
        setTransitioning(true);
        setCompletionMessage(`Level ${level + 1} Completed! Moving to Level ${level + 2}...`);
        setTimeout(() => {
          setLevel((prevLevel) => prevLevel + 1);
          setCompletionMessage('');
        }, 2000);
      } else {
        saveSession();
      }
    }
  }, [cards]);

  const saveSession = async () => {
    try {
      const response = await axios.post('/api/sessions', {
        level: level + 1,
        score: score,
        turns: turns,
        duration: time,
        status: 'completed',
      });
      setHistory([...history, response.data]);
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get('/api/sessions');
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
      setLevelTime((prevLevelTime) => prevLevelTime + 1);
  
      if (levelTime >= 60 && !cards.every(card => card.matched)) {
        setCompletionMessage('Time is up! Restarting level...');
        setTimeout(() => {
          shuffleCards();
          setCompletionMessage('');
        }, 2000);
      }
    }, 1000);
  
    return () => clearInterval(timer);
  }, [levelTime, cards]);
  

  useEffect(() => {
    const delayBeforeShuffle = setTimeout(() => {
      shuffleCards();
    }, 3000);

    return () => clearTimeout(delayBeforeShuffle);
  }, [level]);

  return (
    <div className="App">
      <MusicComponent />
      <AnimatedBackground level={level + 1} turns={turns} time={time} score={score} />
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>Restart Level</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled || transitioning}
          />
        ))}
      </div>
      {completionMessage && <div className="completion-message">{completionMessage}</div>}
      <div className="history">
        <ul>
          {history.map((session, index) => (
            <li key={index}>
              Level: {session.level}, Score: {session.score}, Status: {session.status}, Date: {new Date(session.datePlayed).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Game;
