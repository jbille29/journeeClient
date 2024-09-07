// Entries.jsx
import React from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import EntryCard from '../components/EntryCard'; // Import EntryCard component
import './Entries.css';

const Entries = () => {
  const navigate = useNavigate();

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
  ];

  const handleAddEntryClick = () => {
    navigate(`/${userId}/${journalId}/new`);
  };

  return (
    <section className='journals-section-center'>
      <Navbar />

      <main className='journals-main'>
        <h2 className='journals-heading'>My Entries</h2>

        <div className='journal-grid'>
          {entries.map((entry) => (
            <EntryCard 
              key={entry.entryId} 
              entry={entry} 
              userId={userId} 
              journalId={journalId} 
            />
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
        </div>
      </footer>
    </section>
  );
};

export default Entries;
