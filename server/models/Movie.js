const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  year: Number,
  genre: String,
});

module.exports = mongoose.model('Movie', movieSchema);