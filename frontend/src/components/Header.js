

const Header = () => {
    const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };
  return (
    <header style={headerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Expense Tracker Dashboard</h1>
        <button onClick={handleLogout} style={logoutBtnStyle}>Logout</button>
      </div>
    </header>
  );
};

const headerStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '20px',
  textAlign: 'center',
  fontSize: '12px',
  fontWeight: 'bold',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
};

const logoutBtnStyle = {
  background: '#f44336',
  border: 'none',
  color: 'white',
  padding: '10px 16px',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default Header;
