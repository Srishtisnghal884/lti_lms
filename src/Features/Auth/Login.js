import * as yup from 'yup';
import styled from '@emotion/styled';
import { Box,  TextField, Typography } from '@mui/material';

import 'react-toastify/dist/ReactToastify.css';
import AuthPage from './NewAuthPage';

// Form Styling
// Custom Styled TextField Component
const StyledTextField = styled(TextField)(() => ({
  margin: '10px',
}));
const StyledTypography = styled(Typography)(() => ({
  color: 'red',
  wordWrap: 'break-word',
  maxWidth: '250px',
}));

// Validation Schema
const LoginValidationSchema = yup.object({
  email: yup
    .string()
    .min(5, 'Please enter a valid email address')
    .max(30, 'Enter an alternate email address')
    .required('Please provide a email address')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid format'),

  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(15, 'Character limit exceeded')
    .required('Please enter your password')
    .matches(/\d/, 'Password must contain atleast one number')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain atleast one special character'
    ),
});

// Login Form
const Login = () => {  

  return ( 
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <AuthPage/>  
    </Box>
  );
};

export default Login; 
 