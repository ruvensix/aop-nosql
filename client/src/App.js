import React, { useEffect, useState } from 'react';
import MovieCard from './components/MovieCard';
import './styles.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20; // filmes por página

  useEffect(() => {
    setLoading(true);
    fetch(`https://aop-nosql.onrender.com/api/movies?page=${page}&limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        setMovies(data.movies);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao carregar filmes:', err);
        setLoading(false);
      });
  }, [page]);

  const goPrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const goNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Loading movies...</p>;
  if (movies.length === 0) return <p style={{ textAlign: 'center' }}>No movies found.</p>;

  return (
    <div>
      <h1>Filmes (Página {page} de {totalPages})</h1>
      <div className="movie-list">
        {movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>

      <div style={{ textAlign: 'center', margin: '20px' }}>
        <button onClick={goPrev} disabled={page === 1}>
          Anterior
        </button>
        <button onClick={goNext} disabled={page === totalPages} style={{ marginLeft: '10px' }}>
          Próximo
        </button>
      </div>
    </div>
  );
}

export default App;

