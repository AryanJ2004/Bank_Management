import React, { useState, useEffect } from 'react';

const BankAccountForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    ifscCode: '',
    branchName: '',
    bankName: '',
    accountNumber: '',
    accountHolderName: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      ifscCode: '',
      branchName: '',
      bankName: '',
      accountNumber: '',
      accountHolderName: '',
    
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="ifscCode" className="form-label">IFSC Code</label>
        <input
          type="text"
          className="form-control"
          id="ifscCode"
          name="ifscCode"
          value={formData.ifscCode}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="branchName" className="form-label">Branch Name</label>
        <input
          type="text"
          className="form-control"
          id="branchName"
          name="branchName"
          value={formData.branchName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="bankName" className="form-label">Bank Name</label>
        <input
          type="text"
          className="form-control"
          id="bankName"
          name="bankName"
          value={formData.bankName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="accountNumber" className="form-label">Account Number</label>
        <input
          type="text"
          className="form-control"
          id="accountNumber"
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="accountHolderName" className="form-label">Account Holder Name</label>
        <input
          type="text"
          className="form-control"
          id="accountHolderName"
          name="accountHolderName"
          value={formData.accountHolderName}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">{initialData ? 'Update' : 'Add'} Bank Account</button>
    </form>
  );
};

export default BankAccountForm;