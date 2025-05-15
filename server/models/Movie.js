const mongoose = require('mongoose');

// Schema flexível para aceitar qualquer estrutura (útil com MongoDB sample data)
const movieSchema = new mongoose.Schema({}, {
  collection: 'movies', // Usa explicitamente a coleção correta
  strict: false          // Aceita qualquer campo presente no documento
});

module.exports = mongoose.model('Movie', movieSchema);
