const express = require('express');
const mongoose = require('mongoose');
const Game = require('./models/gameModel');
const bodyParser = require('body-parser');

const app = express();
const port = 5000; // or any port you prefer

app.use(bodyParser.json()); // Middleware to parse JSON bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/wordle-game', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Route to save game data
app.post('/api/saveGame', async (req, res) => {
  const { playerId, levelData, totalScore, totalTime } = req.body;

  try {
    let game = await Game.findOne({ playerId });

    if (game) {
      // Update existing game data
      game.levelData = levelData;
      game.totalScore = totalScore;
      game.totalTime = totalTime;
    } else {
      // Create new game data
      game = new Game({
        playerId,
        levelData,
        totalScore,
        totalTime
      });
    }

    await game.save();
    res.status(200).json({ message: 'Game data saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Route to retrieve game data
app.get('/api/getGame/:playerId', async (req, res) => {
  const { playerId } = req.params;

  try {
    const game = await Game.findOne({ playerId });

    if (game) {
      res.status(200).json(game);
    } else {
      res.status(404).json({ message: 'Game data not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
