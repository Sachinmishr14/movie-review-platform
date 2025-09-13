import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setUser({ token: res.data.token }); // Add userId if returned
      navigate('/');
    } catch (err) {
      setError('Login failed');
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
    padding: '20px',
    fontFamily: '"Poppins", sans-serif',
  };

  const formStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    backdropFilter: 'blur(5px)',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    border: '2px solid #3498db',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    outline: 'none',
    background: '#fff',
    color: '#333',
    '&:focus': {
      borderColor: '#e74c3c',
      boxShadow: '0 0 8px rgba(231, 76, 60, 0.5)',
    },
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    background: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.3s ease, transform 0.2s ease',
    '&:hover': {
      background: '#c0392b',
      transform: 'scale(1.05)',
    },
  };

  const errorStyle = {
    color: '#e74c3c',
    fontSize: '14px',
    marginTop: '10px',
    textAlign: 'left',
    paddingLeft: '5px',
  };

  const headingStyle = {
    color: '#e74c3c',
    marginBottom: '20px',
    fontWeight: '600',
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={headingStyle}>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            style={inputStyle}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            style={inputStyle}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button style={buttonStyle} type="submit">Login</button>
        </form>
        {error && <p style={errorStyle}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;