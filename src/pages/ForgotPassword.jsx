import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
 // Import individual styles for Forgot Password page
import './FormStyles.css'

const ForgotPassword = () => {
  const navigate = useNavigate()
  
  return (
    <section className='section-center'>
      <nav className='nav'>
        <button className='nav-btn' onClick={() => navigate('/')}>
          <FaArrowLeft />
        </button>
      </nav>

      <form className='form-container'>
        <h3 className='form-heading'>Forgot Password</h3>
        <div className='form-control'>
          <input
            type='email'
            className='form-input'
            placeholder='Enter your email'
            required
          />
        </div>
        <button type='submit' className='submit-btn'>
          Submit
        </button>
        <div className='form-links'>
          <Link to='/login' className='form-link'>
            Back to Login
          </Link>
        </div>
      </form>
    </section>
  );
};

export default ForgotPassword;
