import React, { useEffect, useState } from 'react';
import axios from 'axios';

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '30px',
};

const thTdStyle = {
  border: '1px solid #ddd',
  padding: '12px',
  textAlign: 'left',
};

const headerStyle = {
  backgroundColor: '#007bff',
  color: 'white',
};

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/student/findAll') // Replace with your actual endpoint
      .then(res => setUsers(res.data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Data</h2>
      <table style={tableStyle}>
        <thead style={headerStyle}>
          <tr>
            <th style={thTdStyle}>ID</th>
            <th style={thTdStyle}>Name</th>
            <th style={thTdStyle}>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? users.map((user) => (
            <tr key={user.id}>
              <td style={thTdStyle}>{user.userId}</td>
              <td style={thTdStyle}>{user.firstname} {user.lastname}</td>
              <td style={thTdStyle}>{user.username}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan="3" style={thTdStyle}>No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
