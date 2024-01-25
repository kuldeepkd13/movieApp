// MovieDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./MovieDetailPage.css"

const MovieDetailPage = ({ userRole }) => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateData, setUpdateData] = useState({
    title: '',
    genre: '',
    description: ''
  });
  const [isUpdating, setIsUpdating] = useState(false); // State to control update form visibility

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4500/movie/${movieId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        setMovie(data.movie);
        setUpdateData({
          title: data.movie.title,
          genre: data.movie.genre,
          description: data.movie.description
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Failed to fetch movie details. Please try again later.');
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4500/movie/update/${movieId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `${token}`
        },
        body: JSON.stringify(updateData)
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message); // Show success message
        setIsUpdating(false); // Hide update form after successful update
        // You may also choose to update the movie details displayed without refreshing the page
        window.location.reload(); // Refresh the page to reflect updated movie details
      } else {
        alert(data.message); // Show error message
      }
    } catch (error) {
      console.error('Error updating movie details:', error);
      // Handle error (e.g., show error message)
    }
  };

  const handleCancelUpdate = () => {
    setIsUpdating(false);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4500/movie/delete/${movieId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message); // Show success message
        // Redirect or update UI after successful deletion
      } else {
        alert(data.message); // Show error message
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
      
    }
  };

  const handleAddToWishlist = async() => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:4500/user/addtowishlist/${movieId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          alert(data.message); // Show success message
          // Redirect or update UI after successful deletion
        } else {
          alert(data.message); // Show error message
        }
      } catch (error) {
        console.error('Error deleting movie:', error);
        
      }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="movie-detail-container">
      <div className="movie-image">
        <img src={movie?.image} alt={movie?.title} />
      </div>
      <div className="movie-details">
        <h2>{movie?.title}</h2>
        <p>Genre: {movie?.genre}</p>
        <p>Release Year: {new Date(movie?.releaseDate).getFullYear()}</p>
        <p className="movie-description">{movie?.description}</p>
        <div className="buttons-container">
          {userRole === 'Admin' && (
            <div className="admin-buttons">
              <button onClick={() => setIsUpdating(true)}>Update</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
          <button className="add-to-wishlist-button" onClick={handleAddToWishlist}>Add to Wishlist</button>
        </div>
        {isUpdating && (
          <div className="update-form">
            <form onSubmit={handleUpdate}>
              <input type="text" name="title" value={updateData.title} onChange={handleInputChange} />
              <input type="text" name="genre" value={updateData.genre} onChange={handleInputChange} />
              <textarea name="description" value={updateData.description} onChange={handleInputChange} />
              <button type="submit">Update</button>
              <span className="cancel-icon" onClick={handleCancelUpdate}>X</span>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;
