const Movie = require('../models/Movie');

exports.getMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;    // página atual (default 1)
    const limit = parseInt(req.query.limit) || 20; // filmes por página (default 20)
    const skip = (page - 1) * limit;

    // busca filmes paginados
    const movies = await Movie.find().skip(skip).limit(limit);

    // contar total de filmes para saber quantas páginas há
    const total = await Movie.countDocuments();

    // responde com a estrutura correta
    res.json({
      movies,                      // lista paginada
      page,                        // página atual
      totalPages: Math.ceil(total / limit), // total de páginas
      totalMovies: total,          // total de filmes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao carregar filmes' });
  }
};

