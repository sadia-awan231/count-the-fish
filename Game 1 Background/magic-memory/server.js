const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const sessionRoutes = require('./src/routes/sessions');



// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON body

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/sessions', sessionRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
