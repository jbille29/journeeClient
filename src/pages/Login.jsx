import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useLoginMutation } from '../app/api/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, selectIsAuthenticated, selectUserId } from '../features/authSlice';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('jb@gmail.com');
  const [password, setPassword] = useState('123456');
  const [errorMessage, setErrorMessage] = useState('');  // Unified error state

  const [login, { isLoading, error }] = useLoginMutation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if the user is already authenticated
    if (isAuthenticated) {
      navigate(`/${userId}/journals`);
    }
  }, [isAuthenticated, userId, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message before new submission

    // Client-side validation: check if email or password fields are empty
    if (!email || !password) {
      setErrorMessage('Both email and password are required!');
      return;
    }

    // Create an abort controller to handle cleanup
    const controller = new AbortController();

    try {
      const userData = await login({ email, password }, { signal: controller.signal }).unwrap();
      dispatch(setCredentials({
        username: userData.username,
        userId: userData._id,
        accessToken: userData.token,
      }));
      navigate(`/${userData._id}/journals`);
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Login request was aborted');
      } else {
        setErrorMessage(error?.data?.message || 'Failed to login. Please try again.');
      }
    }

    return () => {
      // Abort the request if the component unmounts or if another request is made
      controller.abort();
    };
  };

  return (
    <section className='login-section-center'>

      <nav className='login-nav'>
        <button className='login-nav-btn' onClick={() => navigate('/')}>
          <FaArrowLeft />
        </button>
      </nav>

      <form className='login-form' onSubmit={handleLogin}>
        <h3 className='login-form-heading'>Login</h3>
        
        {/* Unified error message for both client-side and server-side errors */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className='login-form-control'>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='login-input'
            placeholder='Email'
            aria-label='Email'
            required
          />
        </div>
        <div className='login-form-control'>
          <input
            type='password'
            className='login-input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            aria-label='Password'
            required
          />
        </div>
        <button type='submit' className='login-submit-btn' disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <div className='login-form-links'>
          <Link to='/forgot-password' className='login-forgot-password-link'>
            Forgot Password?
          </Link>
          <Link to='/signup' className='login-signup-link'>
            Don't have an account? Sign up
          </Link>
        </div>
      </form>

    </section>
  );
};

export default Login;
