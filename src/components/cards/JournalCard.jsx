import React from 'react';
import { Link } from 'react-router-dom';
import { useGetEntriesByJournalIdQuery } from '../../app/api/apiSlice';

import './Card.css'

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
    <Link to={`/${journal.user}/${journal._id}`} className='card-container'>
      <h2>{journal.title}</h2>
      <div className='card-stats'>
        <p className='card-last-updated'><strong>Last updated: </strong>{new Date(journal.updatedAt).toLocaleDateString()}</p>
        <p className='card-entry-num'><strong>Entries: </strong>{entries.length}</p>
      </div>
      {latestEntry ? (
        <div className='card-entry-preview'>
          <p className='card-entry-title'>{latestEntry.title}</p>
          <p className='card-entry-text'>{latestEntry.content.slice(0, 100)}...</p>
        </div>
      ) : (
        <div className='card-entry-preview'>
          <h3 className='card-entry-title'>No entries yet</h3>
        </div>
      )}
    </Link>
  );
};

export default JournalCard;
