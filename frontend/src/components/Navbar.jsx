import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

function NavBar({ isLoggedIn, handleLogout }) {
  return (
    <nav>
      <div>
        <Link to="/">Movie APP</Link>
      </div>
      <div>
        {isLoggedIn ? (
          <>
            <Link to="/wishlist">Wishlist</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/signin">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
