const express = require('express');
const Review = require('../models/Review');
const Movie = require('../models/Movie');
const jwt = require('jsonwebtoken'); // For auth middleware

const router = express.Router();

// Middleware to verify token
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).send('Access denied');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

// Post review
router.post('/:movieId', authMiddleware, async (req, res) => {
  try {
    const review = new Review({ ...req.body, user: req.user.userId, movie: req.params.movieId });
    await review.save();
    // Update average rating
    const reviews = await Review.find({ movie: req.params.movieId });
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Movie.findByIdAndUpdate(req.params.movieId, { average_rating: avg });
    res.status(201).json(review);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = { router, authMiddleware };