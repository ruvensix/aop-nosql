import React, { useEffect, useState } from 'react';
import MovieCard from './components/MovieCard';
import './styles.css'; // ✅ Importa o ficheiro de estilos global

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://aop-nosql.onrender.com/api/movies')
      .then(res => res.json())
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao carregar filmes:', err);
        setLoading(false);
      });
  }, []);

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
    </div>
  );
}

export default App;
