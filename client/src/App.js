import React, { useEffect, useState } from 'react';
import Movie from './components/Movie';

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

  if (loading) return <p>Loading movies...</p>;
  if (movies.length === 0) return <p>No movies found.</p>;

  return (
    <div>
      <h1>Filmes</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {movies.map(movie => (
          <Movie key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
