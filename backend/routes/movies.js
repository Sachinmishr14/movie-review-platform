const express = require('express');
const Movie = require('../models/Movie');
const Review = require('../models/Review');
const axios = require('axios'); // For TMDB

const router = express.Router();

// Get all movies (with filter by genre/year)
router.get('/', async (req, res) => {
  try {
    const { genre, year } = req.query;
    let filter = {};
    if (genre) filter.genre = genre;
    if (year) filter.release_year = year;
    const movies = await Movie.find(filter);
    res.json(movies);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get movie by ID with reviews
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    const reviews = await Review.find({ movie: req.params.id }).populate('user', 'username');
    res.json({ movie, reviews });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add movie (basic, or from TMDB)
router.post('/', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// TMDB search (optional endpoint)
router.get('/search-tmdb', async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}`);
    res.json(response.data.results);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;