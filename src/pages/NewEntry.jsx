import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import "./Landing.css"
import { useCreateEntryMutation } from '../app/api/apiSlice';
import { useGetEntriesByJournalIdQuery } from '../app/api/apiSlice';

const NewEntry = () => {
  const navigate = useNavigate();
  const { userId, journalId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: entries = [], isLoading: entriesLoading, isError: entriesError } = useGetEntriesByJournalIdQuery(journalId);
  const entriesCount = entries.length;

  const [entryName, setEntryName] = useState("");
  const [text, setText] = useState('');

  const [createEntry] = useCreateEntryMutation()

  useEffect(() => {
    setEntryName(`Entry #${entriesCount + 1}`);
  }, [entriesCount]);
  
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleCancelClick = () => {
    setIsModalOpen(true);
  };

  const handleBackClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmBack = () => {
    navigate(`/${userId}/${journalId}`);
  };

  const handleNoClick = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    if (!text.trim()) {  // Check if the content is empty or only contains spaces
      alert('Please fill out the content before submitting.');  // You can handle this in different ways
      return;
    }
    try {
      await createEntry({
        title: entryName,
        content: text,
        journal: journalId
      });
      // Navigate back to journals page if successful
      setEntryName("")
      setText("")
      navigate(`/${userId}/${journalId}`);
    } catch (error) {
      console.error('Failed to create entry:', error);
      alert("Failed to create entry.")
    }
  };

  return (
    <div className='landing-container'>
      <nav className='navbar' 
        style={{
          justifyContent: "start"
        }}>
        <button className='nav-btn' onClick={handleBackClick}>
          <FaArrowLeft />
        </button>
      </nav>

      <main>
        <input 
          type="text" 
          placeholder='Name your entry'
          value={entryName}
          onChange={(e)=>{setEntryName(e.target.value)}}
          style={{
            width: '100%', // Make the input take the full width of the container
            fontSize: '1.75rem', // Increase the font size to make it look more like a heading
            padding: '10px 15px', // Add padding for more space inside the input
            border: '2px solid #4FC3F7', // Add a subtle border
            borderRadius: '5px', // Slightly round the corners
            marginBottom: '20px', // Add some margin at the bottom for spacing
            boxSizing: 'border-box', // Ensure the padding doesn't affect the width
          }}
        />
        <textarea
          className='landing-textarea'
          placeholder='Write your journal entry...'
          value={text}
          onChange={handleChange}
        />
        <div style={{
          display: "flex",
          justifyContent:"space-between",
          width: "100%"
        }}>
          <button 
            className='primary-btn' 
            onClick={handleSubmit}
            style={{
              width:"50%"
            }}
          >
            Submit
          </button>
          <button 
            className='red-btn' 
            onClick={handleCancelClick}
            style={{
              width:"50%"
            }}
          >
            Cancel
          </button>
        </div>
      </main>

      {isModalOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h2>Are you sure?</h2>
            <div className='modal-actions'>
              <button className='primary-btn' onClick={handleConfirmBack}>
                Yes
              </button>
              <button className='red-btn' onClick={handleNoClick}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewEntry;
