import React, { useState } from 'react'

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
            <h2>Add New Journal</h2>
            <div className="form-control">
                <input
                    type="text"
                    name="title"
                    className="form-input"
                    placeholder="Journal Title"
                    value={newJournal.title}
                    onChange={handleChange}
                />
            </div>
            <div className="form-control">
                <textarea
                    name="description"
                    className="form-input"
                    placeholder="Journal Description"
                    value={newJournal.description}
                    onChange={handleChange}
                />
            </div>
            <div className="modal-actions">
                <button className="modal-btn create-btn" onClick={handleSubmit}>
                    Create
                </button>
                <button className="modal-btn cancel-btn" onClick={onClose}>
                    Cancel
                </button>
            </div>
        </div>
    </div>
  )
}

export default AddJournalModal