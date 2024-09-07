import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './ContactUs.css';  // Import individual styles for Contact Us page

const ContactUs = () => {
  return (
    <section className='section-center'>
      <nav className='nav'>
        <button className='nav-btn'>
          <FaArrowLeft />
        </button>
      </nav>

      <form className='form-container'>
        <h3 className='form-heading'>Contact Us</h3>
        <div className='form-control'>
          <input
            type='text'
            className='form-input'
            placeholder='Your Name'
            required
          />
        </div>
        <div className='form-control'>
          <input
            type='email'
            className='form-input'
            placeholder='Your Email'
            required
          />
        </div>
        <div className='form-control'>
          <textarea
            className='form-input'
            placeholder='Your Message'
            required
            rows='5'
          />
        </div>
        <button type='submit' className='submit-btn'>
          Send Message
        </button>
      </form>
    </section>
  );
};

export default ContactUs;
