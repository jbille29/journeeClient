// Journal.jsx
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useGetJournalsQuery, useCreateJournalMutation } from '../app/api/apiSlice';
import AddJournalModal from '../components/modals/AddJournalModal';
import JournalCard from '../components/cards/JournalCard';
import Navbar from '../components/Navbar';

const Journal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { data: journals = [], isLoading: journalsLoading, isError: journalsError } = useGetJournalsQuery();
  const [createJournal] = useCreateJournalMutation();

  /* Modal functions */
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const handleModalSubmit = async (journalData) => {
    setNewJournal(journalData);
    try {
      await createJournal(journalData);
      closeModal();
      setNewJournal({ title: '', description: '' });
    } catch (error) {
      console.error('Failed to create journal:', error);
    }
  };

  const filteredJournals = journals.filter((journal) => {
    const journalTitle = journal.title ? journal.title.toLowerCase() : ''; 
    const latestEntry = journal.latestEntryContent ? journal.latestEntryContent.toLowerCase() : ''; 
    return journalTitle.includes(searchTerm.toLowerCase()) || latestEntry.includes(searchTerm.toLowerCase());
  });

  if (journalsLoading) return <p>Loading...</p>;
  if (journalsError) return <p>Error loading journals</p>;

  return (
    <section className='journals-section-center'>
      <Navbar />

      <main className='journals-main'>
        <h2 className='journals-heading'>My Journals</h2>

        <div className='journal-grid'>
          {filteredJournals.map((journal) => (
            <JournalCard key={journal._id} journal={journal} />
          ))}
        </div>
      </main>

      <footer className='journal-footer'>
        <button className='journals-footer-btn' onClick={openModal}>
          <FaPlus /> Add Journal
        </button>
        <div className='journals-search'>
          <div className='journals-search-bar'>
            <input
              type='text'
              className='journals-footer-input'
              placeholder='Search journals...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </footer>

      {isModalOpen && (
        <AddJournalModal onClose={closeModal} onSubmit={handleModalSubmit} />
      )}
    </section>
  );
};

export default Journal;
