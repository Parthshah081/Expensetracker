import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import './ExpenseTrends.css';
const ExpenseTrends = ({ expenses }) => {
  const data = expenses.reduce((acc, expense) => {
    if (acc[expense.category]) {
      acc[expense.category] += expense.amount;
    } else {
      acc[expense.category] = expense.amount;
    }
    return acc;
  }, {});

  const chartData = Object.keys(data).map((category) => ({
    category,
    amount: data[category],
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF66CC']; // Example colors for pie chart

  return (
    <div className="expense-trends">
      <PieChart width={600} height={300}>
        <Pie
          data={chartData}
          dataKey="amount"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default ExpenseTrends;
