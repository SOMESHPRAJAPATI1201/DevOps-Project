import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css'; // Adjust the path as necessary

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstname : '',
    lastname : '',
    password: '',
    username : ''
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      await axios.post(`http://localhost:8081/student/auth/register`, formData);
      setMessage({ type: 'success', text: 'Registration successful! Redirecting to login...' });
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Registration failed. Email may already be taken.' });
    }
  };

  return (
    <div className="register-container">
      <form className="register-box" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {message.text && (
          <p className={message.type === 'error' ? 'error' : 'success'}>
            {message.text}
          </p>
        )}

        <input
          type="email"
          name="username"
          placeholder="Email"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="lastname"
          placeholder="Lastname"
          value={formData.lastname}
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

        <button type="submit">Register</button>
        <p className="login-link">Already have an account? <a href="/">Login</a></p>
      </form>
    </div>
  );
};

export default RegisterPage;
