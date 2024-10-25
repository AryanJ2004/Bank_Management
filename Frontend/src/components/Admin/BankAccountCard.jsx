// BankAccountCard.jsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function BankAccountCard({ account }) {
  return (
    <Card elevation={2} sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {account.bankName}
        </Typography>
        <Typography variant="body2">Account Number: {account.accountNumber}</Typography>
        <Typography variant="body2">IFSC Code: {account.ifscCode}</Typography>
        <Typography variant="body2">Branch: {account.branchName}</Typography>
        <Typography variant="body2">Account Holder: {account.accountHolderName}</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          User: {account.user ? account.user.username : 'N/A'}
        </Typography>
        <Typography variant="body2">
          Email: {account.user ? account.user.email : 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BankAccountCard;
