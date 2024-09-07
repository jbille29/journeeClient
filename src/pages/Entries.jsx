import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../features/authSlice';
import { useDispatch } from 'react-redux';
import { FaArrowLeft, FaPlus, FaFilter, FaUser, FaSignOutAlt, FaCog, FaSearch } from 'react-icons/fa';
import './Entries.css';

const Entries = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Example userId and journalId for demonstration purposes
  const userId = '123'; // Replace with actual userId
  const journalId = 'abc'; // Replace with actual journalId
  const entries = [
    {
      entryId: 'entry1',
      title: 'Entry Title 1',
      content: 'This is the content of entry 1. It gives a brief preview of what the entry is about.',
      createdDate: '2024-08-24',
      wordCount: 150,
    },
    {
      entryId: 'entry2',
      title: 'Entry Title 2',
      content: 'This is the content of entry 2. It gives a brief preview of what the entry is about.',
      createdDate: '2024-08-23',
      wordCount: 200,
    },
    {
      entryId: 'entry3',
      title: 'Entry Title 3',
      content: 'This is the content of entry 3. It gives a brief preview of what the entry is about.',
      createdDate: '2024-08-22',
      wordCount: 175,
    },
    // Add more entries as needed
  ];

  const handleAddEntryClick = () => {
    navigate(`/${userId}/${journalId}/new`);
  };

  const handleProfileClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleSettingsClick = () => {
    navigate(`/${userId}`);
    setIsProfileMenuOpen(false);
  };

  const handleLogOutClick = () => {
    dispatch(logOut());
    setIsProfileMenuOpen(false);
    navigate('/');
  };

  return (
    <section className='journals-section-center'>
        <nav className='journals-nav'>
          <button className='journals-nav-btn'>
            <FaArrowLeft />
          </button>
          <div className='journals-profile-container'>
            <FaUser className='journals-profile-icon' onClick={handleProfileClick}/>
            {isProfileMenuOpen && (
            <div className='journals-profile-menu'>
              <button className='journals-menu-item'>
                <FaCog /> Settings
              </button>
              <button className='journals-menu-item' onClick={handleLogOutClick}>
                <FaSignOutAlt /> Log Out
              </button>
            </div>
          )}
          </div>
        </nav>

      <main className='journals-main'>
        <h2 className='journals-heading'>My Entries</h2>

        <div className='journal-grid'>
          {entries.map((entry) => (
            <Link
              to={`/${userId}/${journalId}/${entry.entryId}`}
              className='journal-card'
              key={entry.entryId}
            >
              <h3 className='journal-title'>{entry.title}</h3>
              <div className='journal-meta'>
                <p className='journal-date'><strong>Last updated: </strong>{entry.createdDate}</p>
                <p className='journal-entries'><strong>Word Count: </strong>{entry.wordCount}</p>
              </div>
              <p className='journals-entry-preview'>{entry.content}</p>
            </Link>
          ))}
        </div>
      </main>

      <footer className='journal-footer'>
        <button className='journals-footer-btn' onClick={handleAddEntryClick}>
          <FaPlus /> Add Entry
        </button>
        <div className='journals-search'>
            <div className='journals-search-bar'>
              <input
                type='text'
                className='journals-footer-input'
                placeholder='Search entries...'
              />
              <button className='journals-search-btn'>
                <FaSearch />
              </button>
            </div>
            <button className='journals-footer-btn'>
              <FaFilter /> Filter
            </button>
          </div>
      </footer>

    </section>
  );
};

export default Entries;
