import React, { useState } from 'react';
import './EditExpenseForm.css'; // Import CSS file for EditExpenseForm

const EditExpenseForm = ({ expense, editExpense, onClose }) => {
  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);
  const [category, setCategory] = useState(expense.category);
  const [date, setDate] = useState(expense.date);

  const handleSubmit = (e) => {
    e.preventDefault();
    editExpense({
      ...expense,
      title,
      amount: parseFloat(amount),
      category,
      date,
    });
    onClose();
  };

  return (
    <form className="edit-expense-form" onSubmit={handleSubmit}>
      <input className="edit-input" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input className="edit-input" type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <input className="edit-input" type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
      <input className="edit-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <button className="edit-submit-button" type="submit">Save</button>
    </form>
  );
};

export default EditExpenseForm;
