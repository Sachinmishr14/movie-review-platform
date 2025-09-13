const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  genre: [String],
  release_year: Number,
  director: String,
  cast: [String],
  synopsis: String,
  poster_url: String,
  average_rating: { type: Number, default: 0 },
  tmdb_id: String // For TMDB integration
});

module.exports = mongoose.model('Movie', movieSchema);