const express = require('express');
const router = express.Router();
const BankAccount = require('../models/BankAccount');
const auth = require('../middleware/auth');

// Add bank account
router.post('/', auth, async (req, res) => {
  try {
    const { ifscCode, branchName, bankName, accountNumber, accountHolderName } = req.body;
    const newBankAccount = new BankAccount({
      user: req.user.id,
      ifscCode,
      branchName,
      bankName,
      accountNumber,
      accountHolderName,
    });
    await newBankAccount.save();
    res.json(newBankAccount);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get user's bank accounts
router.get('/', auth, async (req, res) => {
  try {
    const bankAccounts = await BankAccount.find({ user: req.user.id });
    res.json(bankAccounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update bank account
router.put('/:id', auth, async (req, res) => {
  try {
    const { ifscCode, branchName, bankName, accountNumber, accountHolderName } = req.body;
    let bankAccount = await BankAccount.findById(req.params.id);
    if (!bankAccount) return res.status(404).json({ message: 'Bank account not found' });
    if (bankAccount.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    bankAccount = await BankAccount.findByIdAndUpdate(
      req.params.id,
      { ifscCode, branchName, bankName, accountNumber, accountHolderName },
      { new: true }
    );
    res.json(bankAccount);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete bank account
router.delete('/:id', auth, async (req, res) => {
  try {
    const bankAccount = await BankAccount.findById(req.params.id);
    if (!bankAccount) return res.status(404).json({ message: 'Bank account not found' });
    if (bankAccount.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    await BankAccount.findByIdAndDelete(req.params.id);
    res.json({ message: 'Bank account removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;