// const express = require('express');
// const router = express.Router();
// const BankAccount = require('../models/BankAccount');
// const User = require('../models/User');
// const auth = require('../middleware/auth');

// // Admin middleware
// const adminAuth = (req, res, next) => {
//   if (!req.user.isAdmin) return res.status(403).json({ message: 'Access denied' });
//   next();
// };

// // Get all users' bank information
// router.get('/bank-accounts', [auth, adminAuth], async (req, res) => {
//   try {
//     const bankAccounts = await BankAccount.find().populate('user', 'username email');
//     res.json(bankAccounts);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Search users by name or bank details
// router.get('/search', [auth, adminAuth], async (req, res) => {
//   try {
//     const { query } = req.query;
//     const users = await User.find({
//       $or: [
//         { username: { $regex: query, $options: 'i' } },
//         { email: { $regex: query, $options: 'i' } },
//       ],
//     });
//     const bankAccounts = await BankAccount.find({
//       $or: [
//         { bankName: { $regex: query, $options: 'i' } },
//         { accountHolderName: { $regex: query, $options: 'i' } },
//       ],
//     }).populate('user', 'username email');
//     res.json({ users, bankAccounts });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const BankAccount = require('../models/BankAccount');
const BankUser = require('../models/User'); // Update the import name to match the schema
const auth = require('../middleware/auth');

// Admin middleware
const adminAuth = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Access denied' });
  next();
};

// Get all users' bank information
router.get('/bank-accounts', [auth, adminAuth], async (req, res) => {
  try {
    const bankAccounts = await BankAccount.find()
      .populate({ path: 'user', model: 'BankUser', select: 'username email' }); // Specify the model as 'BankUser'
    res.json(bankAccounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Search users by name or bank details
router.get('/search', [auth, adminAuth], async (req, res) => {
  try {
    const { query } = req.query;
    const users = await BankUser.find({ // Use BankUser model
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ],
    });
    const bankAccounts = await BankAccount.find({
      $or: [
        { bankName: { $regex: query, $options: 'i' } },
        { accountHolderName: { $regex: query, $options: 'i' } },
      ],
    }).populate({ path: 'user', model: 'BankUser', select: 'username email' }); // Specify 'BankUser' model in populate
    res.json({ users, bankAccounts });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
