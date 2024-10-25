// src/components/OTPVerification.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import axios from 'axios';

function OTPVerification() {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const email = localStorage.getItem('email'); // Get email from local storage
            const response = await axios.post('https://bankbackend1.vercel.app/api/auth/verify-otp', { email, otp });
            localStorage.setItem('token', response.data.token); // Store JWT token
            navigate('/dashboard'); // Redirect to dashboard or relevant page
        } catch (err) {
            console.error(err.response.data);
            alert(err.response.data.message); // Show error message
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 64px)' }}>
            <Paper elevation={6} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <Typography component="h1" variant="h5" align="center" gutterBottom>
                    Verify OTP
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ py: 1.5, fontSize: '1rem', mb: 2 }}>
                        Verify OTP
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default OTPVerification;
