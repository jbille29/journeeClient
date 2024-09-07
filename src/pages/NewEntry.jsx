import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './NewEntry.css';

const NewEntryPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancelClick = () => {
    setIsModalOpen(true);
  };

  const handleBackClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmCancel = () => {
    navigate('/journals/1');
  };

  const handleConfirmBack = () => {
    navigate('/journals/1');
  };

  const handleNoClick = () => {
    setIsModalOpen(false);
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
        <h2>New Entry</h2>
        <textarea
          className='form-input entry-input'
          placeholder='Write your journal entry...'
          rows='10'
        />
        <div className='entry-actions'>
          <button className='entry-btn submit-btn' onClick={handleSubmit}>
            Submit
          </button>
          <button className='entry-btn cancel-btn' onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </main>

      {isModalOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h2>Are you sure?</h2>
            <div className='modal-actions'>
              <button className='modal-btn yes-btn' onClick={handleConfirmBack}>
                Yes
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

export default NewEntryPage;
