// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Snackbar } from '@mui/material';
import axios from 'axios';
import SearchBar from './SearchBar';
import BankAccountCard from './BankAccountCard';

function AdminDashboard() {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchAllBankAccounts();
  }, []);

  const fetchAllBankAccounts = async () => {
    try {
      const res = await axios.get('https://bankbackend1.vercel.app/api/admin/bank-accounts', {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      setBankAccounts(res.data);
      showSnackbar('Fetched all bank accounts successfully.');
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      showSnackbar('Failed to fetch bank accounts. Please try again.');
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      fetchAllBankAccounts();
      return;
    }
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/search?query=${searchQuery}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      setBankAccounts(res.data.bankAccounts);
      showSnackbar('Search results updated.');
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      showSnackbar('Search failed. Please try again.');
    }
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f0f2f5', minHeight: '100vh', padding: 3 }}>
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Paper sx={{ p: 2, mb: 3, backgroundColor: '#fff' }}>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleSearch} />
        </Paper>
        <Grid container spacing={3}>
          {bankAccounts.map((account) => (
            <Grid item xs={12} sm={6} md={4} key={account._id}>
              <BankAccountCard account={account} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Snackbar Component */}
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={3000}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
}

export default AdminDashboard;
