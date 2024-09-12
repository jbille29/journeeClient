import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa';  // For the "X" icon
import './AddJournal.css'

const AddJournalModal = ({ onClose, onSubmit }) => {
  // Initialize form state
  const [newJournal, setNewJournal] = useState({
    title: '',
    description: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJournal({
      ...newJournal,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    // Pass the form data back to the parent
    onSubmit(newJournal);
  };

  return (
    <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Add New Journal</h2>
            <FaTimes className="close-icon" onClick={onClose} />
          </div>
            <div className="modal-body">
              <div className="form-control">
              <label htmlFor="journalName" className="form-label">Journal Name</label>
                  <input
                      type="text"
                      name="title"
                      id="journalName"
                      className="form-input"
                      placeholder="Enter journal name"
                      value={newJournal.title}
                      onChange={handleChange}
                  />
              </div>
              <div className="form-control">
                  <label htmlFor="journalDescription" className="form-label">Journal Description</label>
                  <textarea
                      name="description"
                      className="form-input"
                      id="journalDescription"
                      value={newJournal.description}
                      onChange={handleChange}
                      placeholder="Describe your journal"
                      rows="6"
                  />
              </div>
            </div>
            <div className="modal-footer">
              <button className="create-btn primary-btn" onClick={handleSubmit}>
                Create Journal
              </button>
            </div>
        </div>
    </div>
  )
}

export default AddJournalModal