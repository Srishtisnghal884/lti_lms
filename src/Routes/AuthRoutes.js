import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../Features/Auth/Login';
import SignUp from '../Features/Auth/Signup';
import ForgotPassword from '../Features/Auth/ForgotPassword';
import ResetPassword from '../Features/Auth/ResetPassword';
import { PublicRoute } from '../Features/Auth/PublicRoute';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute redirectTo="/" />}> 
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='forgotPassword' element={<ForgotPassword />} />
        <Route path='resetpassword/:_id/:token' element={<ResetPassword />} />
      </Route> 
    </Routes>
  );
};

export default AuthRoutes;
