import React from 'react';

function MovieCard({ movie }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      width: '250px',
      padding: '10px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#fff'
    }}>
      <img
        src={movie.poster || 'https://via.placeholder.com/250x350?text=No+Image'}
        alt={movie.title}
        style={{ width: '100%', borderRadius: '6px', marginBottom: '10px' }}
      />
      <h3 style={{ margin: '0 0 10px' }}>{movie.title}</h3>
      <p><strong>Ano:</strong> {movie.year}</p>
      <p><strong>Género:</strong> {movie.genre || movie.genres?.join(', ')}</p>
      <p><strong>Diretor:</strong> {movie.director || movie.directors?.join(', ')}</p>
      <p><strong>Rating:</strong> {movie.rating || movie.rated || 'N/A'}</p>
    </div>
  );
}

export default MovieCard;
