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

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/banks', require('./routes/banks'));
app.use('/api/admin', require('./routes/admin'));

// Serve static files
app.use(express.static(path.join(__dirname, 'dist'))); 

// Handle all other routes
app.get('*', (req, res) => {
  // Check if the request is for an API route
  if (req.url.startsWith('/api/')) {
    // If it's an API route, pass it to the next middleware (which will be your API routes)
    return next();
  }
  // For all other routes, serve the index.html file
  res.sendFile(path.join(__dirname, 'dist', 'index.html')); 
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
