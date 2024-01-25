// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./Pages/SignIn";
import SignUpPage from "./Pages/SignUp";
import NavBar from "./components/Navbar";
import Homepage from "./Pages/Homepage";
import MovieDetailPage from "./Pages/MovieDetailPage";
import { useState } from 'react';
import Wishlist from "./Pages/Wishlist";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4500/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `${token}`
        },

      });
      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Show success message
        localStorage.removeItem('token'); // Remove token from localStorage
        localStorage.removeItem('isLoggedIn'); // Remove isLoggedIn from localStorage
        localStorage.removeItem('userRole'); 
        setIsLoggedIn(false); // Update isLoggedIn state in App component
        window.location.href = '/';
      } else {
        alert(data.message); // Show error message
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <BrowserRouter>
        <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/movie/:movieId" element={<MovieDetailPage userRole={localStorage.getItem('userRole')} />} />
          <Route path="/wishlist" element={<Wishlist />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
