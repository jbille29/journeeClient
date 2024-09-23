import React, { useState, useEffect } from 'react';
import { useRegisterMutation, apiSlice } from '../app/api/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, selectIsAuthenticated, selectUserId } from '../features/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './Signup.css';
import './FormStyles.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('123456');
  const [confirmPassword, setConfirmPassword] = useState('123456');
  const [errorMessage, setErrorMessage] = useState('');  // Unified error state

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

    // Create an abort controller to handle cleanup
    const controller = new AbortController();

    try {
      const userData = await register({ username, email, password }, { signal: controller.signal }).unwrap();
      dispatch(setCredentials({
        username: userData.username,
        userId: userData._id,
        accessToken: userData.token,
      }));
       // Reset API cache to ensure no stale data is kept
      dispatch(apiSlice.util.resetApiState());

      // Invalidate journals cache to ensure fresh data
      dispatch(apiSlice.util.invalidateTags([{ type: 'Journals', id: userData._id }]));

      navigate(`/${userData._id}/journals`);
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Signup request was aborted');
      } else {
        setErrorMessage(error?.data?.message || 'Failed to sign up. Please try again.');
      }
    }

    return () => {
      // Abort the request if the component unmounts or if another request is made
      controller.abort();
    };
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

        {/* Unified error message for both client-side and server-side errors */}
        {errorMessage && <p className="error-message">{errorMessage}</p>} 

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
