import React, { useState, useEffect } from "react";
import "./game.css";
import backgroundImage from "./assets/background.png";
import MusicComponent from './music.js';
import Fish1 from "./assets/Fish1.png";
import Fish2 from "./assets/Fish2.png";
import Fish3 from "./assets/Fish3.png";
import Fish4 from "./assets/Fish4.png";
import Fish5 from "./assets/Fish5.png";
import Fish6 from "./assets/Fish6.png";
import Fish7 from "./assets/Fish7.png";
import Fish8 from "./assets/Fish8.png";

// Data for all levels with counts and number of images accordingly
const levelsData = [
  [
    { image: Fish1, count: 1 },
    { image: Fish2, count: 1 },
  ],
  [
    { image: Fish1, count: 1 },
    { image: Fish2, count: 1 },
    { image: Fish3, count: 1 },
  ],
  [
    { image: Fish1, count: 2 },
    { image: Fish2, count: 2 },
    { image: Fish3, count: 2 },
  ],
  [
    { image: Fish1, count: 1 },
    { image: Fish2, count: 1 },
    { image: Fish3, count: 1 },
    { image: Fish4, count: 1 },
  ],
  [
    { image: Fish1, count: 2 },
    { image: Fish2, count: 1 },
    { image: Fish3, count: 1 },
    { image: Fish4, count: 2 },
    { image: Fish5, count: 1 },
  ],
  [
    { image: Fish1, count: 3 },
    { image: Fish2, count: 3 },
    { image: Fish3, count: 3 },
    { image: Fish4, count: 3 },
    { image: Fish5, count: 3 },
    { image: Fish6, count: 3 },
    { image: Fish7, count: 3 },
    { image: Fish8, count: 3 },
  ],
];

// Helper function to generate random positions
const getRandomPosition = (maxLeft, maxTop) => {
  const x = Math.random() * maxLeft;
  const y = Math.random() * maxTop;
  return { x, y };
};

function Game() {
  const [level, setLevel] = useState(1);
  const [userCounts, setUserCounts] = useState({});
  const [correctFlags, setCorrectFlags] = useState({});
  const [message, setMessage] = useState("");
  const [fishPositions, setFishPositions] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [maxWrongGuesses, setMaxWrongGuesses] = useState(5); // Set max wrong guesses

  // Timer: Increment time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize counts, flags, and positions when level changes
  useEffect(() => {
    if (level <= levelsData.length) {
      const currentLevelData = levelsData[level - 1];
      const initialCounts = currentLevelData.reduce(
        (acc, _, index) => ({ ...acc, [index]: "" }),
        {}
      );
      const initialFlags = currentLevelData.reduce(
        (acc, _, index) => ({ ...acc, [index]: null }),
        {}
      );
      setUserCounts(initialCounts);
      setCorrectFlags(initialFlags);
      setMessage("");
      setWrongGuesses(0); // Reset wrong guesses for the new level

      // Define max width and height for the fish positions
      const maxLeft = 80;
      const maxTop = 80;

      // Generate positions for the current level
      const positions = currentLevelData.flatMap((fish, index) =>
        Array(fish.count)
          .fill()
          .map(() => {
            const { x, y } = getRandomPosition(maxLeft, maxTop);
            return { image: fish.image, x, y, index };
          })
      );

      setFishPositions(positions);
      setTime(0);
    }
  }, [level]);

  const handleChange = (index, event) => {
    const value = event.target.value.trim();
    const currentLevelData = levelsData[level - 1];
    const correctCount = currentLevelData[index].count;
    const isCorrect = parseInt(value, 10) === correctCount;

    setUserCounts((prevCounts) => ({
      ...prevCounts,
      [index]: value,
    }));

    setCorrectFlags((prevFlags) => ({
      ...prevFlags,
      [index]: isCorrect,
    }));

    if (!isCorrect && value !== "") {
      setWrongGuesses((prevWrongGuesses) => prevWrongGuesses + 1);
    }

    const allCorrect = currentLevelData.every((fish, i) => {
      const currentValue = i === index ? value : userCounts[i];
      return parseInt(currentValue, 10) === fish.count;
    });

    if (allCorrect && value !== "") {
      setMessage(`🎉 Congratulations! Level ${level} completed.`);
      setScore((prevScore) => prevScore + 10); // Add score for level completion
      setTimeout(() => {
        if (level < levelsData.length) {
          setLevel((prevLevel) => prevLevel + 1);
        } else {
          setMessage("🏆 Awesome! You have completed all levels.");
        }
      }, 1500);
    }

    // Game over condition
    if (wrongGuesses + 1 >= maxWrongGuesses) {
      setMessage("💔 Game Over! You've exceeded the maximum wrong guesses.");
      setLevel(1); // Reset to level 1
      setScore(0); // Reset score
    }
  };

  const handleRestart = () => {
    setLevel(1);
    setScore(0);
    setWrongGuesses(0);
    setMessage("");
    setTime(0);
  };

  return (
    <div className="app">
      <MusicComponent />
      <div className="header">
        <h2>Level: {level}</h2>
        <h2>Score: {score}</h2>
        <h2>Time: {time} seconds</h2>
        <h2>Wrong guesses: {wrongGuesses} / {maxWrongGuesses}</h2>
      </div>
      <div className="rectangle">
        <div
          className="left-side"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            position: "relative",
            width: "50%",
            height: "100%",
          }}
        >
          {fishPositions.map((fish, i) => (
            <img
              key={`${fish.index}-${i}`}
              src={fish.image}
              className={`fish fish-${fish.index + 1}`}
              alt={`Fish ${fish.index + 1}`}
              style={{
                left: `${fish.x}%`,
                top: `${fish.y}%`,
                position: "absolute",
                width: "70px",
                height: "70px",
              }}
            />
          ))}
        </div>
        <div className="right-side" style={{ width: "50%", padding: "20px" }}>
          <div className="box-container" style={{ display: "flex", flexWrap: "wrap" }}>
            {levelsData[level - 1].map((fish, index) => (
              <div
                key={index}
                className="box"
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  margin: "10px",
                  textAlign: "center",
                  width: "100px",
                }}
              >
                <img
                  src={fish.image}
                  alt={`Fish ${index + 1}`}
                  className="box-image"
                  style={{ width: "50px", height: "50px" }}
                />
                <input
                  type="number"
                  min="0"
                  value={userCounts[index]}
                  onChange={(event) => handleChange(index, event)}
                  className="count-input"
                  style={{ width: "50px", margin: "5px" }}
                />
                {correctFlags[index] !== null && (
                  <div
                    className={`feedback ${
                      correctFlags[index] ? "correct" : "incorrect"
                    }`}
                  >
                    {correctFlags[index] ? "✔️" : "❌"}
                  </div>
                )}
              </div>
            ))}
          </div>
          {message && <div className="message">{message}</div>}
          <button onClick={handleRestart} className="restart-button">Restart Game</button>
        </div>
      </div>
    </div>
  );
}

export default Game;
