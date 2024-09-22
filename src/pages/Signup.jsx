import React, { useState, useEffect } from 'react';
import { useRegisterMutation } from '../app/api/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, selectIsAuthenticated, selectUserId } from '../features/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './Signup.css';
import './FormStyles.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  // New state to handle errors

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userId = useSelector(selectUserId);

  const [register, { isLoading, error }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirect authenticated user to journals if they are already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/${userId}/journals`);
    }
  }, [isAuthenticated, userId, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    try {
      const userData = await register({ username, email, password }).unwrap();
      dispatch(setCredentials({
        username: userData.username,
        userId: userData._id,
        accessToken: userData.token,
      }));
      navigate(`/${userData._id}/journals`);
    } catch (err) {
      // Handle possible server-side errors
      console.error('Failed to sign up:', err);
      setErrorMessage('Failed to sign up. Please try again.');
    }
  };

  return (
    <section className='section-center'>
      <nav className='nav'>
        <button className='nav-btn' onClick={() => navigate('/')}>
          <FaArrowLeft />
        </button>
      </nav>

      <form className='signup-form' onSubmit={handleSignup}>
        <h3 className='form-heading'>Sign Up</h3>

        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Error message */}
        
        <div className='form-control'>
          <input
            type='text'
            className='signup-input'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
            required
          />
        </div>
        <div className='form-control'>
          <input
            type='email'
            className='signup-input'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            required
          />
        </div>
        <div className='form-control'>
          <input
            type='password'
            className='signup-input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
          />
        </div>
        <div className='form-control'>
          <input
            type='password'
            className='signup-input'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
            required
          />
        </div>

        <button type='submit' className='submit-btn'>
          {isLoading ? 'Signing up...' : 'Sign up'}
        </button>
        
        {error && <p className="error-message">{error.data?.message || 'Sign up failed'}</p>} {/* Backend error handling */}

        <div className='form-links'>
          <Link to='/login' className='login-link'>
            Already have an account? Log In
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Signup;
