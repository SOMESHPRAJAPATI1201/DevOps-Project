
import React from 'react';

const LoginForm = () => {
    const [formData, setFormData] = React.useState({
        username: '',
        password: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your login logic here
    };
    
    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
        <h2>Login</h2>
        <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            required
        />
        <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            required
        />
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff' }}>
            Login
        </button>
        </form>
    );
}

export default LoginForm;