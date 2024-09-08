// Entries.jsx
import React, { useState } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import EntryCard from '../components/cards/EntryCard'; // Import EntryCard component
import './Entries.css';
import { useGetEntriesByJournalIdQuery } from '../app/api/apiSlice';

const Entries = () => {
  const navigate = useNavigate();
  const { userId, journalId } = useParams()
  const { data: entries = [], isLoading: entriesLoading, isError: entriesError } = useGetEntriesByJournalIdQuery(journalId);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  const handleAddEntryClick = () => {
    navigate(`/${userId}/${journalId}/new`);
  };

  /* Search functions */
  const filteredEntries = entries.filter((entry) => {
    const entryTitle = entry.title ? entry.title.toLowerCase() : ''; 
    const entryContent = entry.content ? entry.content.toLowerCase() : ''; 
    return entryTitle.includes(searchTerm.toLowerCase()) || entryContent.includes(searchTerm.toLowerCase());
  });

  if (entriesLoading) return <p>Loading...</p>;
  if (entriesError) return <p>Error loading entries</p>;

  return (
    <section className='journals-section-center'>

      <Navbar />

      <main className='journals-main'>
        <h2 className='journals-heading'>My Entries</h2>

        <div className='journal-grid'>
          {filteredEntries.map((entry) => (
            <EntryCard 
              key={entry._id} 
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
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
