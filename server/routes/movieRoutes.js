const express = require('express');
const router = express.Router();
const { getMovies, createMovie } = require('../controllers/movieController');

router.get('/', getMovies);
router.post('/', createMovie);

module.exports = router;