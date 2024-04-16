import React from 'react';
import BulletGraph from './BulletGraph';
import './ExpenseByCategory.css'; // Import the CSS file

const ExpenseByCategory = ({ expenses }) => {
  // Calculate total expenses by category
  const categoryExpenses = expenses.reduce((acc, expense) => {
    if (acc[expense.category]) {
      acc[expense.category] += expense.amount;
    } else {
      acc[expense.category] = expense.amount;
    }
    return acc;
  }, {});

  return (
    <div className="expense-by-category"> {/* Apply the className */}
      <h2>Expense by Category</h2>
      {Object.keys(categoryExpenses).map((category, index) => (
        <div key={index}>
          <h3>{category}</h3>
          <BulletGraph
            value={categoryExpenses[category]}
            target={4000} // Set the target value
            ranges={[{ color: '#ff6666' }, { color: '#ffff66' }, { color: '#66ff66' }]} // Set the colors for different ranges
            width={300}
            height={30}
          />
        </div>
      ))}
    </div>
  );
};

export default ExpenseByCategory;
