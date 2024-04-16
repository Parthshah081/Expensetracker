import React, { useState, useEffect } from 'react';
import './App.css';
import AddExpenseForm from './components/AddExpenseForm';
import AddIncomeForm from './components/AddIncomeForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import ExpenseTrends from './components/ExpenseTrends';
import EditExpenseForm from './components/EditExpenseForm';
import Modal from './components/Modal';
import Alert from './components/Alert';
import { loadExpenses, saveExpenses } from './utils';
import ExpenseByCategory from './components/ExpenseByCategory';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [walletBalance, setWalletBalance] = useState(5000);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showEditExpenseModal, setShowEditExpenseModal] = useState(false); // State for showing/hiding the edit modal
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [alert, setAlert] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(0);
  
  useEffect(() => {
    const savedExpenses = loadExpenses();
    if (savedExpenses) {
      setExpenses(savedExpenses);
    }
  }, []);

  useEffect(() => {
    saveExpenses(expenses);
    const totalAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setTotalExpenses(totalAmount);
  }, [expenses]);

  const addExpense = (expense) => {
    if (expense.amount > walletBalance) {
      setAlert('Cannot spend more than available balance!');
      return;
    }
    setExpenses([...expenses, expense]);
    setWalletBalance(walletBalance - expense.amount);
    setShowAddExpenseModal(false);
  };

  const addIncome = (amount) => {
    setWalletBalance(walletBalance + amount);
    setShowAddIncomeModal(false);
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
    const deletedExpense = expenses.find((expense) => expense.id === id);
    setWalletBalance(walletBalance + deletedExpense.amount);
  };

  const handleEditExpense = (editedExpense) => {
    setExpenses(expenses.map((expense) => (expense.id === editedExpense.id ? editedExpense : expense)));
  };

  const openEditModal = (expense) => {
    setSelectedExpense(expense);
    setShowEditExpenseModal(true);
  };

  const closeEditModal = () => {
    setSelectedExpense(null);
    setShowEditExpenseModal(false);
  };

  return (
    <div className="main">
      <h1 className="Expense-Tracker">Expense Tracker</h1>
    <div className="App">
      <div className="balance">
        <h3>Wallet Balance: ₹{walletBalance}</h3>
      <button onClick={() => setShowAddIncomeModal(true)}>Add Income</button>
      </div>
      <div className="income">
        <h3>Expences: ₹{totalExpenses}</h3>
      <button onClick={() => setShowAddExpenseModal(true)}>Add Expense</button>
      </div>
      <ExpenseTrends expenses={expenses} />
    </div>
      {/* <ExpenseSummary expenses={expenses} /> */}
      <div className='my-expenses'>
      <div className='my-expense-list'>
      <ExpenseList expenses={expenses} deleteExpense={deleteExpense} openEditModal={openEditModal} />
      </div>
      <div className='my-expense-category'>
      <ExpenseByCategory expenses={expenses} />
      </div>
      </div>
      <Modal show={showAddExpenseModal} onClose={() => setShowAddExpenseModal(false)}>
        <AddExpenseForm addExpense={addExpense} />
      </Modal>

      <Modal show={showAddIncomeModal} onClose={() => setShowAddIncomeModal(false)}>
        <AddIncomeForm addIncome={addIncome} />
      </Modal>

      <Modal show={showEditExpenseModal} onClose={closeEditModal}>
        {selectedExpense && (
          <EditExpenseForm expense={selectedExpense} editExpense={handleEditExpense} onClose={closeEditModal} />
        )}
      </Modal>

      {alert && <Alert message={alert} onClose={() => setAlert(null)} />}
    </div>
  );
}

export default App;
