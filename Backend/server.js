const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// List of allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://bankfrontendman.vercel.app',
  'https://bankfroend.vercel.app',
];

// CORS options with origin check
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true); // Origin is allowed
    } else {
      callback(new Error('Not allowed by CORS')); 
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true,
};

app.use(cors(corsOptions)); 
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/banks', require('./routes/banks'));
app.use('/api/admin', require('./routes/admin'));

// Serve static files from React's build directory
app.use(express.static(path.join(__dirname, 'dist'))); 

// Catch-all handler for frontend routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html')); 
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
