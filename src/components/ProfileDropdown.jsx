import React, { useState } from 'react';
import { FaUser, FaCog, FaSignOutAlt, FaJournalWhills } from 'react-icons/fa';
import { logOut, selectUserId } from '../features/authSlice';
import { apiSlice } from '../app/api/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './ProfileDropdown.css'; // Create the styles for the dropdown


const ProfileDropdown = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userId = useSelector(selectUserId);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOutClick = () => {
    dispatch(logOut());
    dispatch(apiSlice.util.resetApiState());  // Reset RTK Query's API cache
    setIsOpen(false)
    navigate('/');
  };


  return (
    <div className="profile-container">
      {/* User profile icon */}
      <FaUser 
        size={40}
        className="profile-icon" 
        onClick={toggleDropdown} 
        style={{
            cursor: 'pointer',
            transition: 'color 0.3s ease, transform 0.1s ease',
          }}
        />

      {/* Dropdown menu */}
      {isOpen && (
        <div className="dropdown-menu">
          <button className='menu-item' onClick={()=>navigate(`/${userId}/journals`)}> 
            <FaJournalWhills /> Journals
          </button>
          <button className="menu-item">
            <FaCog /> Settings
          </button>
          <button className="menu-item" onClick={handleLogOutClick}>
            <FaSignOutAlt /> Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
