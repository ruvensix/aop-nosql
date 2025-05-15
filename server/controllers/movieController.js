const Movie = require('../models/Movie');

exports.getMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const movies = await Movie.find().skip(skip).limit(limit);
    const total = await Movie.countDocuments();

    res.json({
      movies,
      page,
      totalPages: Math.ceil(total / limit),
      totalMovies: total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao carregar filmes' });
  }
};

exports.createMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar filme' });
  }
};


