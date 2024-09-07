import React from 'react';
import { Link } from 'react-router-dom';
import { useGetEntriesByJournalIdQuery } from '../../app/api/apiSlice';

import './JournalCard.css'

const JournalCard = ({ journal }) => {
  const { data: entries = [], isLoading, isError } = useGetEntriesByJournalIdQuery(journal._id);

  if (isLoading) {
    return <p>Loading entries...</p>;
  }

  if (isError) {
    return <p>Error loading entries</p>;
  }

  const latestEntry = entries.length > 0 ? entries[0] : null;

  return (
    <Link to={`/${journal.user}/${journal._id}`} className='journal-card'>
      <h3 className='journal-title'>{journal.title}</h3>
      <div className='journal-meta'>
        <p className='journal-date'><strong>Last updated: </strong>{new Date(journal.updatedAt).toLocaleDateString()}</p>
        <p className='journal-entries'><strong>Entries: </strong>{entries.length}</p>
      </div>
      {latestEntry ? (
        <div className='journals-latest-entry-preview'>
          <h3 className='journals-entry-title'>{latestEntry.title}</h3>
          <p className='journals-entry-preview'>{latestEntry.content.slice(0, 100)}...</p>
        </div>
      ) : (
        <div className='journals-latest-entry-preview'>
          <h3 className='journals-entry-title'>No entries yet</h3>
        </div>
      )}
    </Link>
  );
};

export default JournalCard;
