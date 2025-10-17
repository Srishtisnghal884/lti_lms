import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useSignupMutation } from "./authApiSlice";
import * as yup from "yup"; 
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
 
import { TextField,  
  Button, 
  InputAdornment,
  IconButton } from "@mui/material"; 
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
 
const SignUpValidationSchema = yup.object({
  username: yup
    .string()
    .min(3, 'Please enter a valid username')
    .required('Please enter your username'),
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

const NewSignUpPage = () => {
    const navigate = useNavigate();
    const [signup, { isLoadingSignup }] = useSignupMutation();   

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
    event.preventDefault();
    };

    const formikSignup = useFormik({
    initialValues: {
        username: '', 
        email: '',
        password: '', 
    },
    validationSchema: SignUpValidationSchema,
    onSubmit: (values) => { 
        signupUser(values);  
    },
    });
    
      // Auth signup function
    const signupUser = (credentials) => {
    // Call the signup mutation with credentials
    signup(credentials)
        .unwrap()
        .then((response) => toast.success(response.message)) // Show success message using toast
        .then(() =>
        setTimeout(() => {
            navigate('/auth/login');
        }, 7500)
        )
        .catch((error) => {
        const errorMessage =
            error?.error?.message ||
            error?.data?.error?.message ||
            'An error occurred.';
        toast.error(errorMessage); // Show error message using toast
        });
    };

    return <>
      <Box component="form" onSubmit={formikSignup.handleSubmit} sx={{ mt: 2 }}>
            <TextField
              size="small" 
              variant="outlined" 
              margin="normal"  
              required
              id='email'
              label='E-mail'
              fullWidth
              name='email'
              value={formikSignup.values.email}
              onChange={formikSignup.handleChange}
              onBlur={formikSignup.handleBlur}
              error={formikSignup.touched.email && Boolean(formikSignup.errors.email)}
            /> 
            <TextField
              size="small" 
              variant="outlined" 
              margin="normal"  
              required
              fullWidth
              id='password'
              label='Password'
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={formikSignup.values.password}
              onChange={formikSignup.handleChange}
              onBlur={formikSignup.handleBlur}
              error={formikSignup.touched.password && Boolean(formikSignup.errors.password)}
            /> 
            <TextField
              size="small" 
              type="text"
              variant="outlined" 
              margin="normal"  
              required
              id='username'
              label='Username'
              fullWidth
              name='username'
              value={formikSignup.values.username}
              onChange={formikSignup.handleChange}
              onBlur={formikSignup.handleBlur}
              error={formikSignup.touched.username && Boolean(formikSignup.errors.username)}
            />  

            <Button
                  size="small"
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    py: 1,
                    color: "#fff",
                    mt: 2,
                    backgroundColor: "#f56a00",
                    "&:hover": { backgroundColor: "#e05c00" },
                  }}
                >
              Sign up
            </Button>
          </Box>
    </>
}

export default NewSignUpPage;