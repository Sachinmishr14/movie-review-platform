import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../App';

function Profile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    axios.get(`http://localhost:5000/api/users/${user.userId}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  const profileStyle = {
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

  if (!user) return <p style={{ color: '#e74c3c', textAlign: 'center' }}>Please login</p>;
  if (loading) return <p style={{ color: '#f39c12', textAlign: 'center' }}>Loading...</p>;

  return (
    <div style={profileStyle}>
      <div style={cardStyle}>
        <h2 style={{ color: '#e74c3c' }}>{profile.username}'s Profile</h2>
        <h3 style={{ color: '#27ae60' }}>Watchlist</h3>
        {profile.watchlist.length > 0 ? (
          profile.watchlist.map(m => <p key={m._id} style={{ background: '#ecf0f1', padding: '10px', margin: '5px 0', borderRadius: '8px' }}>{m.title}</p>)
        ) : (
          <p style={{ color: '#7f8c8d' }}>Watchlist is empty</p>
        )}
      </div>
    </div>
  );
}

export default Profile;