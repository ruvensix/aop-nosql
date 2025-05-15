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
        console.log('API response:', data); // <== Log para debug
        if (data && Array.isArray(data.movies)) {
          setMovies(data.movies);
          setTotalPages(data.totalPages || 1);
        } else {
          console.error('Formato de dados inesperado:', data);
          setMovies([]);
          setTotalPages(1);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao carregar filmes:', err);
        setMovies([]);
        setTotalPages(1);
        setLoading(false);
      });
  }, [page]);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading movies...</p>;
  if (!movies.length) return <p style={{ textAlign: 'center' }}>No movies found.</p>;

  return (
    <div>
      <h1>Filmes</h1>
      <div className="movie-list">
        {movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
          Página Anterior
        </button>
        <span style={{ margin: '0 10px' }}>Página {page} de {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
          Próxima Página
        </button>
      </div>
    </div>
  );
}

export default App;


