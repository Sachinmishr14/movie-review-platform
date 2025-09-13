import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createContext, useState } from 'react';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  const appStyle = {
    fontFamily: '"Poppins", sans-serif',
    background: 'linear-gradient(135deg, #1e3c72, #2a5298)', // Gradient background
    minHeight: '100vh',
    color: '#fff',
    margin: 0,
    padding: 0,
  };

  return (
    <div style={appStyle}>
      <AuthContext.Provider value={{ user, setUser }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;