const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  playerId: { type: String, required: true },
  levelData: [
    {
      level: { type: Number, required: true },
      score: { type: Number, required: true },
      time: { type: Number, required: true }, // Time in seconds
    }
  ],
  totalScore: { type: Number, default: 0 },
  totalTime: { type: Number, default: 0 } // Total time across all levels
});

module.exports = mongoose.model('Game', gameSchema);
