// EntryCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './EntryCard.css';

const EntryCard = ({ entry, userId, journalId }) => {
  return (
    <Link to={`/${userId}/${journalId}/${entry._id}`} className='entry-card'>
      <h3 className='entry-title'>{entry.title}</h3>
      <div className='entry-meta'>
        <p className='entry-date'><strong>Last updated: </strong>{entry.createdDate}</p>
        <p className='entry-word-count'><strong>Word Count: </strong>{entry.wordCount}</p>
      </div>
      <p className='entry-preview'>{entry.content}</p>
    </Link>
  );
};

export default EntryCard;
