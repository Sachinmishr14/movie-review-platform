import { Link } from 'react-router-dom';

function Home() {
  const homeStyle = {
    textAlign: 'center',
    padding: '50px',
  };

  const linkStyle = {
    display: 'block',
    margin: '15px 0',
    padding: '10px 20px',
    background: '#27ae60', // Green button
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '8px',
    transition: 'background 0.3s ease',
    '&:hover': {
      background: '#219653',
    },
  };

  return (
    <div style={homeStyle}>
      <h1 style={{ color: '#f39c12', fontSize: '48px' }}>Welcome to Movie Review Platform</h1>
      <Link to="/movies" style={linkStyle}>Browse Movies</Link>
      <Link to="/profile" style={linkStyle}>Profile</Link>
      <Link to="/login" style={linkStyle}>Login</Link>
      <Link to="/register" style={linkStyle}>Register</Link>
    </div>
  );
}

export default Home;