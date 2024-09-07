// Navbar.jsx
import React, { useState } from 'react';
import { FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUserId, logOut } from '../features/authSlice'; 

import './Navbar.css'

const Navbar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userId = useSelector(selectUserId);

  const handleProfileClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleSettingsClick = () => {
    navigate(`/${userId}`);
    setIsMenuOpen(false);
  };

  const handleLogOutClick = () => {
    dispatch(logOut());
    setIsProfileMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className='journals-nav'>
      {isAuthenticated ? (
        <div className='journals-profile-container'>
          <FaUser className='journals-profile-icon' onClick={handleProfileClick} />
          
          {isProfileMenuOpen && (
            <div className='journals-profile-menu'>
              <button className='journals-menu-item' onClick={handleSettingsClick}>
                <FaCog /> Settings
              </button>
              <button className='journals-menu-item' onClick={handleLogOutClick}>
                <FaSignOutAlt /> Log Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className='journals-nav-auth'>
          <Link to="/login" className='journals-nav-btn'>
            Log In
          </Link>
          <Link to="/signup" className='journals-nav-btn'>
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
