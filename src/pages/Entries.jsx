// Entries.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetEntriesByJournalIdQuery, useGetJournalByIdQuery } from '../app/api/apiSlice';

import EntryCard from '../components/cards/EntryCard'; // Import EntryCard component
import ProfileDropdown from '../components/ProfileDropdown';
import './Journals.css';


const Entries = () => {
  const navigate = useNavigate();
  const { userId, journalId } = useParams()
  const { data: entries = [], isLoading: entriesLoading, isError: entriesError } = useGetEntriesByJournalIdQuery(journalId);
  const { data: journal, isLoading: journalLoading, isError: journalError } = useGetJournalByIdQuery(journalId);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  /* Search functions */
  const filteredEntries = entries.filter((entry) => {
    const entryTitle = entry.title ? entry.title.toLowerCase() : ''; 
    const entryContent = entry.content ? entry.content.toLowerCase() : ''; 
    return entryTitle.includes(searchTerm.toLowerCase()) || entryContent.includes(searchTerm.toLowerCase());
  });

  if (entriesLoading || journalLoading) return <p>Loading...</p>;
  if (entriesError || journalError) return <p>Error loading entries</p>;

  return (
    <section className='journals-container'>

      <nav className='journals-navbar'>
        <div className='journals-navbar-row-one'>
          <button 
            className='primary-btn'
            onClick={()=>navigate(`/${userId}/${journalId}/new`)}
          >
            Add Entry
          </button>
          <h2 className='journals-navbar-header'>{journal.title}</h2>
          <ProfileDropdown />
        
        </div>
        <input
          className='journals-navbar-search'
          type='text'
          placeholder='Search entries...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
        <p>{journal.description}</p>
      </nav>

      <main className='journals-grid'>
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry) => (
              <EntryCard 
                key={entry._id} 
                entry={entry} 
                userId={userId} 
                journalId={journalId} 
              />
          ))
        ) : (
          <p>No entries yet</p>
        )}
      </main>

    </section>
  );
};

export default Entries;
