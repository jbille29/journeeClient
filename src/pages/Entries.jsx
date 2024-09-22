import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCog } from 'react-icons/fa'; // For the settings icon
import { useGetEntriesByJournalIdQuery, useGetJournalByIdQuery, useUpdateJournalMutation, useDeleteJournalMutation } from '../app/api/apiSlice';
import EntryCard from '../components/cards/EntryCard';
import ProfileDropdown from '../components/ProfileDropdown';
import EditJournal from '../components/modals/EditJournal';
import './Journals.css';

const Entries = () => {
  const navigate = useNavigate();
  const { userId, journalId } = useParams();
  const { data: entries = [], isLoading: entriesLoading, isError: entriesError } = useGetEntriesByJournalIdQuery(journalId);
  const { data: journal, isLoading: journalLoading, isError: journalError } = useGetJournalByIdQuery(journalId);

  const [updateJournal] = useUpdateJournalMutation();
  const [deleteJournal] = useDeleteJournalMutation();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal state

  const [searchTerm, setSearchTerm] = useState('');

  /* Search functions */
  const filteredEntries = entries.filter((entry) => {
    const entryTitle = entry.title ? entry.title.toLowerCase() : '';
    const entryContent = entry.content ? entry.content.toLowerCase() : '';
    return entryTitle.includes(searchTerm.toLowerCase()) || entryContent.includes(searchTerm.toLowerCase());
  });

  const handleUpdateJournal = async (updatedJournal) => {
    try {
      await updateJournal({ id: journalId, ...updatedJournal }).unwrap();
      setIsEditModalOpen(false); // Close modal after successful update
    } catch (error) {
      console.error('Failed to update journal:', error);
    }
  };

  const handleDeleteJournal = async () => {
    try {
      await deleteJournal(journalId).unwrap();
      navigate('/'); // Navigate to the home or journals page after deletion
    } catch (error) {
      console.error('Failed to delete journal:', error);
    }
  };

  if (entriesLoading || journalLoading) return <p>Loading...</p>;
  if (entriesError || journalError) return <p>Error loading entries or journal</p>;

  return (
    <section className='journals-container'>
      <nav className='journals-navbar'>
        <div className='journals-navbar-row-one'>
          <button 
            className='primary-btn'
            onClick={() => navigate(`/${userId}/${journalId}/new`)}
          >
            Add Entry
          </button>
          <h2 className='journals-navbar-header'>{journal.title}</h2>
          <FaCog className="edit-journal-icon" onClick={() => setIsEditModalOpen(true)} style={{ cursor: 'pointer' }} />
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

      {isEditModalOpen && (
        <EditJournal
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdateJournal}
          onDelete={handleDeleteJournal}
          journalTitle={journal.title}
          journalDescription={journal.description}
        />
      )}
    </section>
  );
};

export default Entries;
