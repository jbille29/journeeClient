import React from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUserId } from '../features/authSlice';

const PrivateRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authenticatedUserId = useSelector(selectUserId);  // Get the authenticated user ID
  console.log(authenticatedUserId)
  const { userId } = useParams();  // Get the userId from the URL

  // If the user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If the authenticated user's ID doesn't match the userId in the URL, redirect to their own journals page
  if (authenticatedUserId !== userId) {
    return <Navigate to={`/${authenticatedUserId}/journals`} />;
  }

  return <Outlet />;  // Continue to the requested page if everything checks out
};

export default PrivateRoute;
