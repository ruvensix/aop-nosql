import React, { useEffect, useState } from 'react';
import MovieCard from './components/MovieCard';
import './styles.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

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

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Loading movies...</p>;
  if (movies.length === 0) return <p style={{ textAlign: 'center' }}>No movies found.</p>;

  return (
    <div>
      <h1>Filmes</h1>
      <div className="movie-list">
        {movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <button onClick={handlePrev} disabled={page === 1}>Anterior</button>
        <span style={{ margin: '0 15px' }}>Página {page} de {totalPages}</span>
        <button onClick={handleNext} disabled={page === totalPages}>Próxima</button>
      </div>
    </div>
  );
}

export default App;
