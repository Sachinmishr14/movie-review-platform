const express = require('express');
const User = require('../models/User');
const { authMiddleware } = require('./reviews');

const router = express.Router();

// Get user profile
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('watchlist');
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add to watchlist
router.put('/watchlist/:movieId', authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.userId, { $addToSet: { watchlist: req.params.movieId } });
    res.send('Added to watchlist');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Remove from watchlist
router.delete('/watchlist/:movieId', authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.userId, { $pull: { watchlist: req.params.movieId } });
    res.send('Removed from watchlist');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;