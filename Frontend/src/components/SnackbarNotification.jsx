import React from 'react';
import { Snackbar } from '@mui/material';

const SnackbarNotification = ({ open, handleClose, message }) => {
  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={3000}
      message={message}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    />
  );
};

export default SnackbarNotification;
