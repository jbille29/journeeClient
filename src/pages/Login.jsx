import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useLoginMutation } from '../app/api/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, selectIsAuthenticated, selectUserId } from '../features/authSlice';
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // If user is already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/${userId}/journals`); // Redirect to the desired route
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({
        username: userData.username,
        userId: userData._id,
        accessToken: userData.token,
      }));
      navigate(`/${userData._id}/journals`);  // Redirect to journals page
    } catch (err) {
      console.error('Failed to login:', err);
    }
  }

  return (
    <section className='login-section-center'>

      <nav className='login-nav'>
        <button className='login-nav-btn' onClick={() => navigate('/')}>
          <FaArrowLeft />
        </button>
      </nav>

      <form className='login-form' onSubmit={handleLogin}>
        <h3 className='login-form-heading'>Login</h3>
        <div className='login-form-control'>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='login-input'
            placeholder='Email'
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
            required
          />
        </div>
        <button type='submit' className='login-submit-btn'>
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
