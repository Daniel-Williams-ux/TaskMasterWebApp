const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const tasksRoutes = require('./routes/tasks');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - allow only your Netlify site
const corsOptions = {
  origin: '*',  // Allow any origin for testing
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type'],  // Specify allowed headers
};

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/tasks', tasksRoutes);

// Database connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));