import './App.css';
import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CssBaseline, responsiveFontSizes, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { customizations } from './Theme';
import { selectTheme } from './Features/Theme/themeSlice'; 
import NotFound404 from './Pages/NotFound404';
import { LayoutContainer } from './Components/Layouts/LayoutContainer';
import AuthRoutes from './Routes/AuthRoutes';
import Login from './Features/Auth/Login';
import CareerChoice from './Pages/Assesment'; 
import ProfilePage from './Pages/profile/ProfilePage';
import HelpVideos from './Pages/help/help';
import ResultPage from './Pages/result/ResultPage';  
import { selectCurrentRole } from './Features/Auth/AuthSlice';
import { PublicRoute } from './Features/Auth/PublicRoute';
import DiagnosticAssessment from './Pages/diagnosticAssessment/diagnosticAssessment';

const App = () => { 
  const [mode, setMode] = useState('light');
  const darkMode = useSelector(selectTheme);

  const memoizedDarkMode = useMemo(() => darkMode, [darkMode]);
  const role = useSelector(selectCurrentRole);
  const isAuthenticated = !!role;  
  useEffect(() => {
    memoizedDarkMode ? setMode('dark') : setMode('light');
  }, [memoizedDarkMode]);

  
  let theme = createTheme(customizations(mode));
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Paper
        style={{ borderRadius: '0', minHeight: '100vh' }}
        elevation={0}
      >
        <Routes>
          <Route element={<PublicRoute redirectTo="/result" />}>
            <Route path='/auth/*' element={<AuthRoutes />} />
            <Route path='/' element={<Login />} /> 
          </Route>
          <Route path='/dashboard/*' element={<LayoutContainer />} />
          <Route path='/404' element={<NotFound404 />} />
          <Route path='/dashboard/career-choice' element={<CareerChoice />} /> 
          <Route path='/user-profile' element={<ProfilePage />} /> 
          <Route path='/user-result' element={<ResultPage />} /> 
           <Route path='/help' element={<HelpVideos />} /> 
           <Route path='/diagnostic-assessment' element={<DiagnosticAssessment />} /> 

          <Route path='*' element={<Navigate replace to='/404' />} />
        </Routes>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
