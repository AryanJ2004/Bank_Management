const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
const sendOTP = require('./sendOtp');  // Import sendOTP module

dotenv.config();

// Helper function to generate a 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Register user with OTP
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP and set expiration time
    const otp = generateOTP();
    const otpExpiry = Date.now() + 5 * 60 * 1000;

    // Create and save new user with OTP and expiration
    user = new User({
      username,
      email,
      password: hashedPassword,
      otp,
      otpExpiry
    });
    await user.save();

    // Send OTP email
    await sendOTP(email, otp);

    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (err) {
    console.error('Error during registration:', err.message);
    res.status(500).send('Server error');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    
    console.log('Login User:', user); // Debugging line

    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    


    // Check if the password matches
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id, isAdmin: user.isAdmin } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, isAdmin: user.isAdmin });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// OTP verification route
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Update user as verified and clear OTP fields
    user.verified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // Create and send JWT
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error('Error during OTP verification:', err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
