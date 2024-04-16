import React, { useState } from 'react';
import './ExpenseList.css';

const ExpenseList = ({ expenses, deleteExpense, openEditModal }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const expensesPerPage = 5;

  // Calculate indexes for slicing expenses array based on current page
  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = expenses.slice(indexOfFirstExpense, indexOfLastExpense);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="expense-list">
      <h2>Expense List</h2>
      <ul>
        {currentExpenses.map((expense) => (
          <li key={expense.id}>
            <span>{expense.title}</span>
            <span>₹{expense.amount}</span>
            <span>{expense.category}</span>
            <span>{expense.date}</span>
            <button className="edit" onClick={() => openEditModal(expense)}>Edit</button>
            <button className="delete" onClick={() => deleteExpense(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {/* Pagination buttons */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(expenses.length / expensesPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
