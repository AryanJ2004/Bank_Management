import React from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import BankAccountItem from './BankAccountItem';

const BankAccountList = ({ bankAccounts, handleEditOpen, handleDelete, toggleAccountVisibility, visibleAccounts }) => {
  return (
    <Grid container spacing={3}>
      {bankAccounts.map((account) => (
        <Grid item xs={12} sm={6} key={account._id}>
          <BankAccountItem
            account={account}
            handleEditOpen={handleEditOpen}
            handleDelete={handleDelete}
            toggleAccountVisibility={toggleAccountVisibility}
            visible={visibleAccounts[account._id]}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default BankAccountList;
