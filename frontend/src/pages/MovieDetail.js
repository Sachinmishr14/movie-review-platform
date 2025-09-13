import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../App';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(1);
  const [text, setText] = useState('');
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setMovie(res.data.movie);
        setReviews(res.data.reviews);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleReview = async () => {
    if (!user) return alert('Login first');
    try {
      const res = await axios.post(`http://localhost:5000/api/reviews/${id}`, { rating, review_text: text }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setReviews([...reviews, res.data]);
      setText('');
    } catch (err) {
      alert('Error posting review');
    }
  };

  const handleWatchlist = async (action) => {
    if (!user) return alert('Login first');
    try {
      await axios({
        method: action === 'add' ? 'put' : 'delete',
        url: `http://localhost:5000/api/users/watchlist/${id}`,
        headers: { Authorization: `Bearer ${user.token}` }
      });
      alert(`${action}ed to watchlist`);
    } catch (err) {
      alert('Error');
    }
  };

  const detailStyle = {
    padding: '40px',
    maxWidth: '800px',
    margin: '0 auto',
    color: '#2c3e50',
  };

  const cardStyle = {
    background: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '5px',
    background: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
    '&:hover': {
      background: '#c0392b',
    },
  };

  const reviewStyle = {
    background: '#ecf0f1',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '8px',
  };

  if (loading) return <p style={{ color: '#f39c12', textAlign: 'center' }}>Loading...</p>;
  if (!movie) return <p style={{ color: '#e74c3c', textAlign: 'center' }}>Movie not found</p>;

  return (
    <div style={detailStyle}>
      <div style={cardStyle}>
        <h2 style={{ color: '#e74c3c' }}>{movie.title}</h2>
        <img src={movie.poster_url || 'https://via.placeholder.com/200'} alt="poster" style={{ borderRadius: '8px' }} />
        <p style={{ margin: '10px 0' }}>{movie.synopsis}</p>
        <button style={buttonStyle} onClick={() => handleWatchlist('add')}>Add to Watchlist</button>
        <button style={buttonStyle} onClick={() => handleWatchlist('remove')}>Remove from Watchlist</button>
        <h3 style={{ color: '#27ae60' }}>Reviews</h3>
        {reviews.map(r => (
          <div key={r._id} style={reviewStyle}>
            {r.user.username}: {r.rating} stars - {r.review_text}
          </div>
        ))}
        <h3 style={{ color: '#27ae60' }}>Write Review</h3>
        <select
          value={rating}
          onChange={(e) => setRating(+e.target.value)}
          style={{ ...buttonStyle, background: '#3498db', marginRight: '10px' }}
        >
          {[1, 2, 3, 4, 5].map(n => <option key={n}>{n}</option>)}
        </select>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '8px', border: '2px solid #ddd' }}
        />
        <button style={buttonStyle} onClick={handleReview}>Submit</button>
      </div>
    </div>
  );
}

export default MovieDetail;