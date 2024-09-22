import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useGetEntryByEntryIdQuery , useUpdateEntryMutation, useDeleteEntryMutation } from '../app/api/apiSlice';


const EditEntry = () => {
  const navigate = useNavigate();
  const { userId, journalId, entryId } = useParams();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: entry, isLoading, isError } = useGetEntryByEntryIdQuery(entryId);
  const [updateEntry] = useUpdateEntryMutation();
  const [deleteEntry] = useDeleteEntryMutation();
  const [entryName, setEntryName] = useState("");
  const [text, setText] = useState('');

  useEffect(() => {
    if(!entry) return

    setEntryName(entry.title);
    setText(entry.content)
  }, [entry]);

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
    navigate(`/${userId}/${journalId}`);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteEntry({ id: entryId, journal: journalId }).unwrap();
      
      navigate(`/${userId}/${journalId}`);
    } catch (error) {
      console.error('Failed to delete entry:', error);
    }
  };

  const handleNoClick = () => {
    setIsCancelModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleSubmit = async () => {
    const updatedEntry = {title: entryName, content: text}
    try {
      await updateEntry({ id: entryId, ...updatedEntry }).unwrap();
      
      navigate(`/${userId}/${journalId}`);
    } catch (error) {
      console.error('Failed to update entry:', error);
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
          onChange={(e)=>{setText(e.target.value)}}
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
            Save Changes
          </button>
          <button 
            className='red-btn' 
            onClick={handleCancelClick}
            style={{
              width:"50%"
            }}
          >
            Cancel Changes
          </button>
        </div>
        <button 
            className='red-btn' 
            onClick={handleDeleteClick}
            style={{
              width:"100%"
            }}
          >
            Delete Entry
          </button>
      </main>

      {isCancelModalOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h2>Are you sure?</h2>
            <div className='modal-actions'>
              <button className='primary-btn' onClick={handleConfirmCancel}>
                Yes
              </button>
              <button className='red-btn' onClick={handleNoClick}>
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
    </div>
  );
};

export default EditEntry;
