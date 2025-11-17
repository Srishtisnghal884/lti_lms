import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectCurrentRole } from './AuthSlice'; 
// '../Features/Auth/AuthSlice'; // Adjust path

/**
 * PublicRoute component protects public routes (like login/register) 
 * from being accessed by authenticated users.
 */
export const PublicRoute = ({ redirectTo = '/' }) => {
  const role = useSelector(selectCurrentRole);
  const isAuthenticated = !!role;  

  // If the user is authenticated (role exists), redirect them.
  return isAuthenticated ? <Navigate to={'/dashboard/career-choice'} replace /> : <Outlet />;
};