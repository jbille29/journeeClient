import React, { useState } from 'react';
import { FaArrowLeft, FaPlus, FaFilter, FaUser, FaSignOutAlt, FaCog, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../features/authSlice';
import { useGetJournalsQuery, useCreateJournalMutation, useGetEntriesByJournalIdQuery } from '../app/api/apiSlice';
import './Journals.css';
import AddJournalModal from '../components/modals/AddJournalModal';'../components/modals/AddJournalModal'
import JournalCard from '../components/cards/JournalCard';

const Journal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newJournal, setNewJournal] = useState({ title: '', description: '' });

    const { data: journals = [], isLoading: journalsLoading, isError: journalsError } = useGetJournalsQuery();
    const [createJournal] = useCreateJournalMutation();

    const handleProfileClick = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    const handleLogOutClick = () => {
        dispatch(logOut());
        setIsProfileMenuOpen(false);
        navigate('/');
    };

    /* Modal functions */
    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);
    const handleModalSubmit = async (journalData) => {
        // Set the form data
        setNewJournal(journalData);
    
        try {
            // Send the request to create a new journal using RTK Query mutation
            await createJournal(journalData);
            
            // Close modal and reset the journal state on success
            closeModal();
            setNewJournal({ title: '', description: '' });
        } catch (error) {
            console.error('Failed to create journal:', error);
        }
    };

    if (journalsLoading) {
        return <p>Loading...</p>;
    }

    if (journalsError) {
        return <p>Error loading journals</p>;
    }

    return (
        <section className='journals-section-center'>
            <nav className='journals-nav'>
                <button className='journals-nav-btn'>
                    <FaArrowLeft />
                </button>
                <div className='journals-profile-container'>
                    <FaUser className='journals-profile-icon' onClick={handleProfileClick} />
                    {isProfileMenuOpen && (
                        <div className='journals-profile-menu'>
                            <button className='journals-menu-item'>
                                <FaCog /> Settings
                            </button>
                            <button className='journals-menu-item' onClick={handleLogOutClick}>
                                <FaSignOutAlt /> Log Out
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            <main className='journals-main'>
                <h2 className='journals-heading'>My Journals</h2>

                <div className='journal-grid'>
                    {journals.map((journal) => (
                        <JournalCard key={journal._id} journal={journal} />
                    ))}
                </div>
            </main>

            <footer className='journal-footer'>
                <button className='journals-footer-btn' onClick={openModal}>
                    <FaPlus /> Add Journal
                </button>
                <div className='journals-search'>
                    <div className='journals-search-bar'>
                        <input
                            type='text'
                            className='journals-footer-input'
                            placeholder='Search journals...'
                        />
                        <button className='journals-search-btn'>
                            <FaSearch />
                        </button>
                    </div>
                    <button className='journals-footer-btn'>
                        <FaFilter /> Filter
                    </button>
                </div>
            </footer>

            {isModalOpen && (
                <AddJournalModal 
                    onClose={closeModal}
                    onSubmit={handleModalSubmit}
                />
            )}
        </section>
    );
};

export default Journal;
