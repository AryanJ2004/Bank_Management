import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Paper } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import BankAccountDialog from './BankAccountDialog';
import BankAccountList from './BankAccountList';
import SnackbarNotification from '../SnackbarNotification';

function Dashboard() {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    ifscCode: '',
    branchName: '',
    bankName: '',
    accountNumber: '',
    accountHolderName: '',
  });
  const [currentAccountId, setCurrentAccountId] = useState(null);
  const [visibleAccounts, setVisibleAccounts] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  useEffect(() => {
    if (location.state?.message) {
      setSnackbarMessage(location.state.message);
      setSnackbarOpen(true);
    }
  }, [location.state]);

  const fetchBankAccounts = async () => {
    try {
      const res = await axios.get('https://bankbackend1.vercel.app/api/banks', {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      setBankAccounts(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    setFormData({
      ifscCode: '',
      branchName: '',
      bankName: '',
      accountNumber: '',
      accountHolderName: '',
    });
  };

  const handleClose = () => setOpen(false);

  const handleEditOpen = (account) => {
    setCurrentAccountId(account._id);
    setFormData(account);
    setEditOpen(true);
  };

  const handleEditClose = () => setEditOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://bankbackend1.vercel.app/api/banks', formData, {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      fetchBankAccounts();
      handleClose();
      setSnackbarMessage('Bank account added successfully!');
      setSnackbarOpen(true);
    } catch (err) {
      console.error(err.response.data);
      alert(err.response.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://bankbackend1.vercel.app/api/banks/${currentAccountId}`, formData, {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      fetchBankAccounts();
      handleEditClose();
      setSnackbarMessage('Bank account updated successfully!');
      setSnackbarOpen(true);
    } catch (err) {
      console.error(err.response.data);
      alert(err.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://bankbackend1.vercel.app/api/banks/${id}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      fetchBankAccounts();
      setSnackbarMessage('Bank account deleted successfully!');
      setSnackbarOpen(true);
    } catch (err) {
      console.error(err.response.data);
      alert(err.response.data.message);
    }
  };

  const toggleAccountVisibility = (accountId) => {
    setVisibleAccounts((prevState) => ({
      ...prevState,
      [accountId]: !prevState[accountId],
    }));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Button variant="contained" onClick={handleOpen} sx={{ mb: 4 }}>
          Add Bank Account
        </Button>
        <BankAccountList
          bankAccounts={bankAccounts}
          handleEditOpen={handleEditOpen}
          handleDelete={handleDelete}
          toggleAccountVisibility={toggleAccountVisibility}
          visibleAccounts={visibleAccounts}
        />
      </Paper>

      <BankAccountDialog
        open={open}
        onClose={handleClose}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleUpdate={handleUpdate}
        isEdit={false}
      />

      <BankAccountDialog
        open={editOpen}
        onClose={handleEditClose}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleUpdate={handleUpdate}
        isEdit={true}
      />

      <SnackbarNotification
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
}

export default Dashboard;
