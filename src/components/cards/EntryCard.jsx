// EntryCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const EntryCard = ({ entry, userId, journalId }) => {


  const wordCount = (str) => {
    // Trim the string and split it by spaces or multiple spaces using a regular expression
    const words = str.trim().split(/\s+/);
    
    // Return the number of words
    return words.length;
  }
  

  return (
    <Link to={`/${userId}/${journalId}/${entry._id}`} className='card-container'>
      <h2>{entry.title}</h2>
      <div className='card-stats'>
        <p className='card-last-updated'><strong>Last updated: </strong>{new Date(entry.createdDate).toLocaleDateString()}</p>
        <p className='card-entry-num'><strong>Word Count: </strong>{wordCount(entry.content)}</p>
      </div>
      <p className='card-entry-preview'>{entry.content}</p>
    </Link>
  );
};

export default EntryCard;
