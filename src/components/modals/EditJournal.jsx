import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';  // For the "X" icon
import './EditJournal.css'; // Updated styles

const EditJournal = ({ onClose, onSubmit, journalTitle, journalDescription, onDelete }) => {
  const [editedJournal, setEditedJournal] = useState({
    title: journalTitle || '',
    description: journalDescription || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedJournal({
      ...editedJournal,
      [name]: value
    });
  };

  const handleUpdate = () => {
    onSubmit(editedJournal);
  };

  return (
    <div className="edit-journal-overlay">
      <div className="edit-journal-content">
        <div className="edit-journal-header">
          <h2>Edit Journal</h2>
          <FaTimes className="edit-journal-close-icon" onClick={onClose} />
        </div>
        <div className="edit-journal-body">
          <div className="form-control">
            <label htmlFor="journalName" className="form-label">Journal Name</label>
            <input
              type="text"
              name="title"
              id="journalName"
              className="form-input"
              value={editedJournal.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="journalDescription" className="form-label">Journal Description</label>
            <textarea
              name="description"
              className="form-input"
              id="journalDescription"
              value={editedJournal.description}
              onChange={handleChange}
              rows="6"
            />
          </div>
        </div>
        <div className="edit-journal-footer">
          <button className="save-btn primary-btn" onClick={handleUpdate}>
            Save Changes
          </button>
          <button className="delete-btn secondary-btn" onClick={onDelete}>
            Delete Journal
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditJournal;
