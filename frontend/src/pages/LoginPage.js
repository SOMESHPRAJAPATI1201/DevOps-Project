import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

// Assuming you have a CSS file for styling
const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  // console.log({ apiBaseUrl });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://backend:8080/student/auth/login', formData);
      const token = response;
      console.log('Login successful:', token);
    //   localStorage.setItem('token', token); // Store token
      window.location.href = '/dashboard';  // Redirect to dashboard
      console.log('Login successful:', token);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <button type="submit">Login</button>
        <p className="register-link">Don't have an account? <a href="/register">Register</a></p>
      </form>
    </div>
  );
};

export default LoginPage;
