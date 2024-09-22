// Navbar.jsx
import React, { useState } from 'react';
import { FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsAuthenticated, selectUserId, logOut } from '../features/authSlice'; 

import ProfileDropdown from './ProfileDropdown';

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
    <nav className='navbar'>
      {isAuthenticated ? (
        <div className='nav-buttons'>
          <ProfileDropdown />
        </div>
      ) : (
        <div className='nav-buttons'>
          <button onClick={()=>navigate('/login')}  className='primary-btn login-btn'>
            Log In
          </button>
          <button onClick={()=>navigate('/signup')} className='secondary-btn signup-btn'>
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
