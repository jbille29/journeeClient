// Journal.jsx
import React, { useState } from 'react';

import { useGetJournalsQuery, useCreateJournalMutation } from '../app/api/apiSlice';

import ProfileDropdown from '../components/ProfileDropdown';
import AddJournal from '../components/modals/AddJournal';
import JournalCard from '../components/cards/JournalCard';
import './Journals.css'

const Journal = () => {

  /* Variables */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { data: journals = [], isLoading: journalsLoading, isError: journalsError } = useGetJournalsQuery();
  const [createJournal] = useCreateJournalMutation();

  /* Modal functions */
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const handleModalSubmit = async (journalData) => {
    try {
      await createJournal(journalData);
      closeModal();
      setNewJournal({ title: '', description: '' });
    } catch (error) {
      console.error('Failed to create journal:', error);
    }
  };

  /* Search functions */
  const filteredJournals = journals.filter((journal) => {
    const journalTitle = journal.title ? journal.title.toLowerCase() : ''; 
    const latestEntry = journal.latestEntryContent ? journal.latestEntryContent.toLowerCase() : ''; 
    return journalTitle.includes(searchTerm.toLowerCase()) || latestEntry.includes(searchTerm.toLowerCase());
  });

  /* Rendering */
  if (journalsLoading) return <p>Loading...</p>;
  if (journalsError) return <p>Error loading journals</p>;

  return (
    <section className='journals-container'>
      
      <nav className='journals-navbar'>
        <div className='journals-navbar-row-one'>
          <button 
            className='primary-btn'
            onClick={openModal}
          >
            Add Journal
          </button>
          <h2 className='journals-navbar-header'>My Journals</h2>
          <ProfileDropdown />
        
        </div>
        <input
          className='journals-navbar-search'
          type='text'
          placeholder='Search journals...'
        />
      </nav>

      <main className='journals-grid'>
        {filteredJournals.length > 0 ? (
          filteredJournals.map((journal) => (
            <JournalCard key={journal._id} journal={journal} />
          ))
        ) : (
          <p>No journals yet</p>
        )}
      </main>

      {isModalOpen && (
        <AddJournal 
          onClose={closeModal} 
          onSubmit={handleModalSubmit} 
        />
      )}

    </section>
  );
};

export default Journal;
