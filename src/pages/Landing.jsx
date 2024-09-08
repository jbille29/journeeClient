import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './Landing.css'; // Assuming your styles are already defined here

const Landing = () => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);

    // Adjust padding when keyboard is likely open (on smaller screens)
    if (window.innerHeight < 600) {
      document.body.style.paddingBottom = '200px'; // Adds space for keyboard
    }

    // Scroll to textarea on focus to ensure visibility
    const textarea = document.getElementById('journalTextarea');
    window.scrollTo({
      top: textarea.offsetTop,
      behavior: 'smooth',
    });
  };

  const handleBlur = () => {
    setIsFocused(false);
    document.body.style.paddingBottom = '0'; // Remove padding when keyboard is hidden
  };

  return (
    <section className='section-center'>
      <Navbar />
      <div className='landing-content'>
        <h3 className='form-heading'>Journal Now</h3>
        <div className='form-control'>
          <textarea
            id='journalTextarea'
            className={`form-input journal-input ${isFocused ? 'fullscreen-textarea' : 'auto-resize-textarea'}`}
            placeholder='What’s on your mind?'
            rows='8'
            value={text}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            spellCheck='true'
            autoCorrect='on'
            autoCapitalize='sentences'
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
