import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Homepage.css'; 

const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:4500/movie/movies');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setMovies(jsonData.movies);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchMovies();
  }, []);

  // Filter movies based on search term
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="homepage-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button>Search</button>
      </div>
      <div className="movie-list">
        {filteredMovies.map(movie => (
          <Link key={movie._id} to={`/movie/${movie._id}`} className="movie-link">
            <div className="movie-card">
              <img src={movie.image} alt={movie.title} />
              <div className="movie-details">
                <h2>{movie.title}</h2>
                <p>Genre: {movie.genre}</p>
                <p>Release Year: {new Date(movie.releaseDate).getFullYear()}</p>
                <p className="movie-description">{movie.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
