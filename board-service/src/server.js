const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const boardRoutes = require('./routes/boardRoutes');

dotenv.config();
const app = express();
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Board Service Running!');
});

// Routes
app.use('/api/boards', boardRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => console.log(`Board Service running on port ${PORT}`));
