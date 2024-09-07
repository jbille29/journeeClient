// Journal.jsx
import React, { useState } from 'react';
import { FaPlus, FaFilter, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useGetJournalsQuery, useCreateJournalMutation } from '../app/api/apiSlice';
import AddJournalModal from '../components/modals/AddJournalModal';
import JournalCard from '../components/cards/JournalCard';
import Navbar from '../components/Navbar';

const Journal = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newJournal, setNewJournal] = useState({ title: '', description: '' });

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

  if (journalsLoading) return <p>Loading...</p>;
  if (journalsError) return <p>Error loading journals</p>;

  return (
    <section className='journals-section-center'>
      <Navbar />

      <main className='journals-main'>
        <h2 className='journals-heading'>My Journals</h2>

        <div className='journal-grid'>
          {journals.map((journal) => (
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

      {isModalOpen && (
        <AddJournalModal onClose={closeModal} onSubmit={handleModalSubmit} />
      )}
    </section>
  );
};

export default Journal;
