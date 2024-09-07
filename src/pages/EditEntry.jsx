import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './EditEntry.css';

const EditEntryPage = () => {
  const navigate = useNavigate();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleCancelClick = () => {
    setIsCancelModalOpen(true);
  };

  const handleBackClick = () => {
    setIsCancelModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmCancel = () => {
    navigate('/journals/1');
  };

  const handleConfirmDelete = () => {
    // Handle the deletion logic here
    console.log('Entry Deleted');
    navigate('/journals/1');
  };

  const handleNoClick = () => {
    setIsCancelModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleSubmit = () => {
    navigate('/journals/1');
  };

  return (
    <section className='section-center'>
      <nav className='nav'>
        <button className='nav-btn' onClick={handleBackClick}>
          <FaArrowLeft />
        </button>
      </nav>

      <main>
        <h2>Edit Entry</h2>
        <textarea
          className='form-input entry-input'
          placeholder='Edit your journal entry...'
          rows='10'
        />
        <div className='entry-actions'>
          <button className='entry-btn submit-btn' onClick={handleSubmit}>
            Save Changes
          </button>
          <button className='entry-btn cancel-btn' onClick={handleCancelClick}>
            Cancel
          </button>
          <button className='entry-btn delete-btn' onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      </main>

      {isCancelModalOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h2>Are you sure?</h2>
            <div className='modal-actions'>
              <button className='modal-btn yes-btn' onClick={handleConfirmCancel}>
                Yes
              </button>
              <button className='modal-btn no-btn' onClick={handleNoClick}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h2>Are you sure you want to delete?</h2>
            <div className='modal-actions'>
              <button className='modal-btn yes-btn' onClick={handleConfirmDelete}>
                Yes, Delete
              </button>
              <button className='modal-btn no-btn' onClick={handleNoClick}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EditEntryPage;
