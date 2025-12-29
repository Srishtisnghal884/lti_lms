import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useCallback, useState } from "react";
import { Tabs, Tab, TextField, Link, Divider } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import styled from "@emotion/styled";
import { useLoginMutation, useSignupMutation } from "./authApiSlice";
import { setCredentials } from "./AuthSlice";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import NewSignUpPage from "./NewSignUp";
import Loading from "../../Components/Loading";
import GImag from "../../Assets/Images/google-icon.svg";
import FVImag from "../../Assets/Images/fv.svg";
import MicrosoftImag from "../../Assets/Images/microsoft-icon.svg"; 
import MainLogo from "../../common/logo";

// import {
//   LoginSocialFacebook,
//   LoginSocialMicrosoft,
// } from "reactjs-social-login";
// import { LoginSocialGoogle } from "reactjs-social-login";

const HIGH_FIVE_IMAGE =
  "https://portal.employabilityadvantage.com/assets/images/highFive.png";
  let logoData = JSON.parse(localStorage.getItem('userData'));
const AuthPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          flex: "0 0 55%",
          backgroundColor: "#182958",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
          position: "relative",
          boxSizing: "border-box",
          "@media (max-width: 900px)": {
            flex: "0 0 100%",
            padding: "0px !important",
          },
        }}
      >
        <Typography
          variant="h3"
          component="h3"
          sx={{
            color: "white",
            fontWeight: 500,
            textAlign: "left",
            width: "100%",
            maxWidth: "400px",
            mb: 2,
            "@media (max-width: 900px)": {
              textAlign: "center",
            },
          }}
        >
          <MainLogo height={70} width={'auto'} />
        </Typography>
        <Paper sx={{backgroundColor: "#182958"}} elevation={3}>
          <LoginFormModal />
        </Paper>
      </Box>

      {/* Right Section: Image and Orange Hexagon */}
      <Box
        sx={{
          flex: "0 0 45%",
          position: "relative",
          overflow: "hidden",
          "@media (max-width: 900px)": {
            display: "none",
          },
        }}
      >
        <Box
          component="img"
          src={HIGH_FIVE_IMAGE}
          alt="People high-fiving"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: "-20%",
            width: "80%",
            height: "100%",
            backgroundColor: "rgba(255, 120, 0, 0.7)",
            clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
            zIndex: 1,
          }}
        />
      </Box>
    </Box>
  );
};

export default AuthPage;

// Helper component for individual tab content
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
 
const LoginValidationSchema = yup.object({
  email: yup
    .string()
    .min(5, "Please enter a valid email address")
    .max(30, "Enter an alternate email address")
    .required("Please provide a email address")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid format"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(15, "Character limit exceeded")
    .required("Please enter your password")
    .matches(/\d/, "Password must contain atleast one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain atleast one special character"
    ),
});

const LoginFormModal = () => {
  const [tabValue, setTabValue] = useState(1); // 0 for Sign up, 1 for Log in
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginValidationSchema,
    onSubmit: (values) => { 
      loginUser(values); // Call updateStaff function to handle form submission
    },
  });

  // Auth Login Function
  // const loginUser = (credentials) => {  
  //   const urlencoded = new URLSearchParams();
  //   urlencoded.append("email", credentials.email);
  //   urlencoded.append("password", credentials.password);  
    
  //   login(urlencoded)
  //     .unwrap()
  //     .then((data) => {  
  //       localStorage.setItem('userData', JSON.stringify(data.user));
  //       dispatch(setCredentials(data.tokens.access))
  //     })
  //     .then(() => navigate('/dashboard/career-choice'))
  //     .catch((error) => {
  //       const errorMessage =
  //         error?.error?.message ||
  //         error?.data?.error?.message ||
  //         'An error occurred.';
  //       toast.error(errorMessage); // Show error message using toast
  //     });
  // };

  const loginUser = (credentials) => {  
  const urlencoded = new URLSearchParams();
  urlencoded.append("email", credentials.email);
  urlencoded.append("password", credentials.password);  
    
  login(urlencoded)
    .unwrap()
    .then((data) => {  
      localStorage.setItem('userData', JSON.stringify(data.user));
      dispatch(setCredentials(data.tokens.access));

      const role = data.user.role_id;
      if (role == 1) {
        // navigate('/admin/dashboard', { replace: true });
        window.location.href = '/admin/dashboard';
             
      } else {
        navigate('/career-choice');
      }
 
    })
    .catch((error) => {
      
      const errorMessage = error?.message ||
        error?.error?.message ||
        error?.data?.error?.message ||
        'An error occurred.';
      toast.error(errorMessage);
    });

};


  //   For viewing or hiding password input field
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSuccess = (credentialResponse) => {
    const idToken = credentialResponse.credential;
    console.log("Login Success:", idToken);
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  // const handleSocialLogin = (platform) => {
  //   console.log(`Logging in with ${platform}`);
  //   if(platform === "Google"){
  //   }
  // };

  // const googleLogin = useGoogleLogin({
  //   onSuccess: handleSuccess,
  //   onError: handleError,
  //   // Add any necessary scopes if you need more than the default profile/email
  //   // scope: 'openid profile email'
  // });

  const handleSocialLogin = (user) => {
    console.log("Login Success:", user);
    // 'user' object typically contains:
    // { provider: 'facebook', profile: { ... }, token: '...' } 
    // TODO: Send the token to your backend for final authentication/session creation.
  };

  // 2. Function to handle a failed login
  const handleSocialLoginFailure = (err) => {
    console.error("Login Failure:", err);
  };

  const onResolve = useCallback((response) => {
    // This is where you get the user data and credentials
    console.log("Google Login Success:", response);

    // The token is usually in response.data.access_token or response.data.id_token
    // You should send this token to your backend for verification and user sign-in.
    const token = response.data.access_token;
    // ... your logic to sign in on your server
  }, []);

  const onReject = useCallback((error) => {
    console.error("Google Login Failure:", error);
  }, []);


  return (
    <div style={{ width: 400, maxWidth: "90vw" }}>
      <Tabs
        value={tabValue}
        // onChange={handleTabChange}
        aria-label="login signup tabs"
        variant="fullWidth"
        sx={{ borderBottom: 1, borderColor: "divider" , 
          '& .MuiTabs-indicator': {
          margin: '0 !important',
        }}}
      >
        {/* <Tab label="Sign up" {...a11yProps(0)} /> */}
        <Tab label="Log in" {...a11yProps(1)} /> 
      </Tabs>

      <TabPanel value={tabValue} index={1}>
        {isLoading ? (
          <Loading open={isLoading} />
        ) : (
          <>
            <Box sx={{ p: 3 }}>
              {/* <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                <Box
                  sx={{ marginRight: "15px", cursor: "pointer"  }}
                  onClick={() => handleSocialLogin("Facebook")}
                >
                  
                    <img
                      className="login-signup-sso-options-microsoft-icon"
                      width={"20"}
                      height={"20"}
                      src={MicrosoftImag}
                      alt=""
                    />
                </Box>
                <Box
                  sx={{ marginRight: "15px", cursor: "pointer" }} 
                >
                 
                    <img
                      className="login-signup-sso-options-facebook-icon"
                      width={"20"}
                      height={"20"}
                      src={GImag}
                      alt=""
                    />
                </Box>
                <Box
                  sx={{ marginRight: "15px", cursor: "pointer"  }}
                  onClick={() => handleSocialLogin("Google")}
                >
                  <img
                    className="login-signup-sso-options-microsoft-icon"
                    width={"20"}
                    height={"20"}
                    src={FVImag}
                    alt=""
                  />
                 
                </Box>
              </Box> */}

              {/* <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  or
                </Typography>
              </Divider> */}

              {/* Email and Password Form */}
              <Box
                component="form"
                onSubmit={(e) => {
                  console.log("formik.handleSubmit", e);
                  formik.handleSubmit(e);
                }}
                sx={{ mt: 2 }}
              >
                <TextField
                  size="small"
                  margin="normal"
                  required
                  id="email"
                  label="E-mail"
                  fullWidth
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="admin@employabilityadvantage.com"
                  error={formik.touched.email && Boolean(formik.errors.email)}
                />

                <TextField
                  size="small"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="12345678"
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
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
                  Log in
                </Button>
              </Box>
            </Box>
          </>
        )}
      </TabPanel>

      {/* Sign Up Tab Content (basic placeholder) */}
      <TabPanel value={tabValue} index={0}>
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{ marginRight: "15px" }}
              onClick={() => handleSocialLogin("Google")}
            >
              <img
                className="login-signup-sso-options-microsoft-icon"
                width={"20"}
                height={"20"}
                src={MicrosoftImag}
                alt=""
              />
            </Box>
            <Box
              sx={{ marginRight: "15px" }}
              onClick={() => handleSocialLogin("Google")}
            >
              <img
                className="login-signup-sso-options-facebook-icon"
                width={"20"}
                height={"20"}
                src={GImag}
                alt=""
              />
            </Box>
            <Box
              sx={{ marginRight: "15px" }}
              onClick={() => handleSocialLogin("Google")}
            >
              <img
                className="login-signup-sso-options-microsoft-icon"
                width={"20"}
                height={"20"}
                src={FVImag}
                alt=""
              />
            </Box>
          </Box>

          {/* OR Divider */}
          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              or
            </Typography>
          </Divider>

          <NewSignUpPage />
        </Box>
      </TabPanel>
    </div>
  );
};
