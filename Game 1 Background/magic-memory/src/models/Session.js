const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  level: { type: Number, required: true },
  score: { type: Number, required: true },
  turns: { type: Number, required: true },
  duration: { type: Number, required: true }, // in seconds
  status: { type: String, default: 'completed' }, // e.g., 'completed', 'in-progress'
  datePlayed: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Session', sessionSchema);
