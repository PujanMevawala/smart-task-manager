const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Health
app.get('/', (req, res) => res.send('Task Service running'));

// API routes
app.use('/api/tasks', require('./routes/taskRoutes'));

// error handler (simple)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Task Service listening on ${PORT}`));
