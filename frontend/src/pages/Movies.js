import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies?genre=${genre}`)
      .then(res => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [genre]);

  const moviesStyle = {
    padding: '40px',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    border: '2px solid #3498db',
    borderRadius: '8px',
    fontSize: '16px',
    background: '#fff',
    color: '#333',
    transition: 'border-color 0.3s ease',
    '&:focus': {
      borderColor: '#e74c3c',
      outline: 'none',
    },
  };

  const movieItemStyle = {
    background: '#ecf0f1',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '8px',
    color: '#2c3e50',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  };

  return (
    <div style={moviesStyle}>
      <h2 style={{ color: '#e74c3c', fontSize: '32px' }}>Movies</h2>
      <input
        style={inputStyle}
        placeholder="Filter by genre"
        onChange={(e) => setGenre(e.target.value)}
      />
      {loading ? (
        <p style={{ color: '#f39c12' }}>Loading...</p>
      ) : (
        movies.map(movie => (
          <div key={movie._id} style={movieItemStyle}>
            <Link to={`/movies/${movie._id}`} style={{ color: '#2c3e50', textDecoration: 'none' }}>
              {movie.title}
            </Link>
            <p>Rating: {movie.average_rating || 'N/A'}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Movies;