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
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <section className='section-center'>
      <Navbar />
      <div className='landing-content'>
        <h3 className='form-heading'>Start Journaling Today</h3>
        <div className='form-control'>
          <textarea
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
        <button className='submit-btn'>Get Started</button>
      </div>
    </section>
  );
};

export default Landing;
