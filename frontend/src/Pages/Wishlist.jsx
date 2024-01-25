import React, { useState, useEffect } from 'react';
import "./Wishlist.css"

const WishlistPage = () => {
  const [wishlistMovies, setWishlistMovies] = useState([]);

  useEffect(() => {
    const fetchWishlistMovies = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://tasty-trunks-bear.cyclic.app/user/wishlist',{
            method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        console.log(jsonData);
        setWishlistMovies(jsonData.wishlist);
      } catch (error) {
        console.error('Error fetching wishlist movies:', error);
      }
    };
    fetchWishlistMovies();
  }, []);

  const handleRemoveFromWishlist = async (movieId) => {
    try {
    const token = localStorage.getItem('token');
      const response = await fetch(`https://tasty-trunks-bear.cyclic.app/user/removeFromWishlist/${movieId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`
          }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Remove the movie from the wishlistMovies state
      setWishlistMovies(prevMovies => prevMovies.filter(movie => movie._id !== movieId));
    } catch (error) {
      console.error('Error removing movie from wishlist:', error);
    }
  };

  return (
    <div className="wishlist-page-container">
      {wishlistMovies.length === 0 ? (
        <p>No movies added to the wishlist yet.</p>
      ) : (
        <div className="movie-list">
          {wishlistMovies.map(movie => (
            <div key={movie._id} className="movie-card">
              <img src={movie.image} alt={movie.title} />
              <div className="movie-details">
                <h2>{movie.title}</h2>
                <p>Genre: {movie.genre}</p>
                <p>Release Year: {new Date(movie.releaseDate).getFullYear()}</p>
                <p className="movie-description">{movie.description}</p>
                <button onClick={() => handleRemoveFromWishlist(movie._id)}>Remove from Wishlist</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
