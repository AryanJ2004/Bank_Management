import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting:', { username, email, password });  // Add this to log form data
      const res = await axios.post('https://bankbackend1.vercel.app/api/auth/register', { username, email, password });
      setOtpSent(true);
      alert(res.data.message);
    } catch (err) {
      console.error('Error in handleSubmit:', err.response ? err.response.data : err.message);  // More detailed logging
      alert(err.response ? err.response.data.message : 'Server error');
    }
  };
  
  // Register.jsx
const handleVerifyOtp = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('https://bankbackend1.vercel.app/api/auth/verify-otp', { email, otp });
    localStorage.setItem('token', res.data.token);

    // Pass success message as state in navigate function
    navigate('/dashboard', { state: { message: 'Signed up successfully!' } });
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    alert(err.response ? err.response.data.message : 'Server error');
  }
};


  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          {otpSent ? 'Verify OTP' : 'Register'}
        </Typography>
        <Box component="form" onSubmit={otpSent ? handleVerifyOtp : handleSubmit} sx={{ mt: 1 }}>
          {!otpSent ? (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Register
              </Button>
            </>
          ) : (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                id="otp"
                label="OTP"
                name="otp"
                autoFocus
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Verify OTP
              </Button>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;
