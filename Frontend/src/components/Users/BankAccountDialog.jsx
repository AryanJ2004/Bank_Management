import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const BankAccountDialog = ({ open, onClose, formData, handleChange, handleSubmit, handleUpdate, isEdit }) => {
  const handleAction = isEdit ? handleUpdate : handleSubmit;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEdit ? 'Edit Bank Account' : 'Add Bank Account'}</DialogTitle>
      <DialogContent>
        {['ifscCode', 'branchName', 'bankName', 'accountNumber', 'accountHolderName'].map((field) => (
          <TextField
            key={field}
            autoFocus={field === 'ifscCode'}
            margin="dense"
            name={field}
            label={field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
            fullWidth
            value={formData[field]}
            onChange={handleChange}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAction}>{isEdit ? 'Update' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BankAccountDialog;
