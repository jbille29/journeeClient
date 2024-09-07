import React from 'react';
import Navbar from '../components/Navbar';
import './Landing.css'; // Assuming your styles are already defined here

const Landing = () => {

  return (
    <section className='section-center'>
      <Navbar />

      <div className='landing-content'>
        <h3 className='form-heading'>Start Journaling Today</h3>
        <div className='form-control'>
          <textarea
            className='form-input journal-input fixed-textarea'
            placeholder='What’s on your mind?'
            rows='8'
          />
        </div>
        <button className='submit-btn'>
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Landing;
