import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { selectIsAuthenticated, selectUserId, logOut } from '../features/authSlice'; // Importing necessary selectors and actions
import './Landing.css'; // Assuming your styles are already defined here

const Landing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userId = useSelector(selectUserId);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleProfileClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSettingsClick = () => {
    navigate(`/${userId}`);
    setIsMenuOpen(false);
  };

  const handleLogOutClick = () => {
    dispatch(logOut());
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <section className='section-center'>
      <nav className='nav'>
        <div></div> {/* Empty div to align buttons to the right */}

        <div className='nav-btns'>
          {isAuthenticated ? (
            <div className='profile-container'>
              <FaUser className='profile-icon' onClick={handleProfileClick} />
              {isMenuOpen && (
                <div className='profile-menu'>
                  <button className='menu-item' onClick={handleSettingsClick}>
                    <FaCog /> Settings
                  </button>
                  <button className='menu-item' onClick={handleLogOutClick}>
                    <FaSignOutAlt /> Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to='/login' className='nav-link'>
                Login
              </Link>
              <Link to='/signup' className='nav-link'>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      <div className='landing-content'>
        <h3 className='form-heading'>Start Journaling Today</h3>
        <div className='form-control'>
          <textarea
            className='form-input journal-input fixed-textarea'
            placeholder='What’s on your mind?'
            rows='8'
          />
        </div>
        <button className='submit-btn'>
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Landing;
