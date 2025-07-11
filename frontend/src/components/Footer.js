import React from 'react';

const footerStyle = {
  backgroundColor: '#f1f1f1',
  color: '#333',
  padding: '15px',
  textAlign: 'center',
  fontSize: '14px',
  position: 'fixed',
  width: '100%',
  bottom: 0,
  boxShadow: '0 -1px 4px rgba(0,0,0,0.1)',
};

const Footer = () => {
  return (
    <footer style={footerStyle}>
      © {new Date().getFullYear()} Expense Tracker. All rights reserved.
    </footer>
  );
};

export default Footer;
