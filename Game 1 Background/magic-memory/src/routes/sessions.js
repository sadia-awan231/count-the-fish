const express = require('express');
const Session = require('../models/Session');

const router = express.Router();

// Create a new session
router.post('/', async (req, res) => {
  const { level, score, turns, duration, status } = req.body;

  try {
    const newSession = new Session({ level, score, turns, duration, status });
    const savedSession = await newSession.save();
    res.status(201).json(savedSession);
  } catch (err) {
    res.status(400).json({ message: 'Error saving session', error: err });
  }
});

// Get all sessions
router.get('/', async (req, res) => {
  try {
    const sessions = await Session.find().sort({ datePlayed: -1 });
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sessions', error: err });
  }
});

module.exports = router;
