import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Navbar from "../components/Navbar"
import "./Landing.css"

const Landing = () => {
  const navigate = useNavigate()

  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };
  
  return (
    <div className='landing-container'>

      <Navbar />
      
      <main>
        <h2>
          “Sometimes the clouds take on shapes only your heart can understand. What do you see when you look at the sky today?”
        </h2>
        <textarea 
          className="landing-textarea"
          placeholder="Rose's are red, violets are..."
          value={text}
          onChange={handleChange}
        >

        </textarea>
        {text.trim() !== '' && (
          <button
            className='primary-btn save-entry-btn'
            onClick={() => alert('Entry Saved!')}
          >
            Save Entry
          </button>
        )}
      </main>
    </div>
  )
}

export default Landing