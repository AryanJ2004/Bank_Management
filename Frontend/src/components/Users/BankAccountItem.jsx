import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const BankAccountItem = ({ account, handleEditOpen, handleDelete, toggleAccountVisibility, visible }) => {
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6">{account.bankName}</Typography>
      <Typography>
        Account Number: {visible ? account.accountNumber : '****' + account.accountNumber.slice(-4)}
        <Button onClick={() => toggleAccountVisibility(account._id)}>
          {visible ? <VisibilityOff /> : <Visibility />}
        </Button>
      </Typography>
      <Typography>IFSC Code: {account.ifscCode}</Typography>
      <Typography>Branch: {account.branchName}</Typography>
      <Typography>Account Holder: {account.accountHolderName}</Typography>
      <Button variant="outlined" onClick={() => handleEditOpen(account)} sx={{ mt: 2 }}>
        Edit
      </Button>
      <Button variant="outlined" color="error" onClick={() => handleDelete(account._id)} sx={{ mt: 2, ml: 2 }}>
        Delete
      </Button>
    </Paper>
  );
};

export default BankAccountItem;
