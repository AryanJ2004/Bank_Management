const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); // Import path module

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// List of allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://bankfrontendman.vercel.app',
  'https://your-production-frontend.com', // Ensure to replace with your actual production URL
];

// CORS options with origin check
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin, such as mobile apps or curl requests
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true); // Origin is allowed
    } else {
      callback(new Error('Not allowed by CORS')); // Origin is not allowed
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true, // Allow credentials (if needed)
};

app.use(cors(corsOptions)); // Use the CORS middleware with options
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/banks', require('./routes/banks'));
app.use('/api/admin', require('./routes/admin'));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist'))); // Change 'dist' to your React app's build directory

// Catch-all route to serve index.html for all non-API requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html')); // Ensure this points to your React app's index.html
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
