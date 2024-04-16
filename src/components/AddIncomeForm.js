import React, { useState } from 'react';

const AddIncomeForm = ({ addIncome }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;
    addIncome(parseFloat(amount));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button type="submit">Add Income</button>
    </form>
  );
};

export default AddIncomeForm;
