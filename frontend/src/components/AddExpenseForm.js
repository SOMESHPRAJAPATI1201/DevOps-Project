import React, { useState } from 'react';
import axios from 'axios';

const AddExpenseForm = () => {
  const [expense, setExpense] = useState({
    type: 'EXPENSE',
    amount: '',
    description: '',
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  // const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://backend:8080';

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const token = localStorage.getItem('token');
    try {
      await axios.post(`http://localhost:8081/expense/save`, expense, {
        // headers: { Authorization: `Bearer ${token}` }
      });
      alert('Expense added!');
      setExpense({ type: 'EXPENSE', amount: '', description: '' });
    } catch (err) {
      alert('Failed to add expense.'+ err.message);
    }
  };

  return (
  <form onSubmit={handleSubmit} style={formStyle}>
    <h3 style={headingStyle}>Add Income/Expense</h3>
    <select name="type" value={expense.type} onChange={handleChange} style={selectStyle}>
      <option value="INCOME">Income</option>
      <option value="EXPENSE">Expense</option>
    </select>
    <input
      type="number"
      name="amount"
      placeholder="Amount"
      value={expense.amount}
      onChange={handleChange}
      style={inputStyle}
      required
    />
    <input
      type="text"
      name="description"
      placeholder="Description"
      value={expense.description}
      onChange={handleChange}
      style={inputStyle}
      required
    />
    <button type="submit" style={buttonStyle}>Add</button>
  </form>
  );
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  margin: '40px 36px',
  padding: '30px',
  maxWidth: '400px',
  border: '1px solid #ddd',
  borderRadius: '10px',
  backgroundColor: '#f9f9f9',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  fontFamily: 'Arial, sans-serif',
};

const inputStyle = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '16px',
};

const selectStyle = {
  ...inputStyle,
};

const buttonStyle = {
  padding: '12px',
  backgroundColor: '#007bff',
  color: '#fff',
  fontSize: '16px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const headingStyle = {
  textAlign: 'center',
  marginBottom: '10px',
  color: '#333',
};

export default AddExpenseForm;
