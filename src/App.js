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

const App = () => { 
  const [mode, setMode] = useState('light');
  const darkMode = useSelector(selectTheme);

  const memoizedDarkMode = useMemo(() => darkMode, [darkMode]);

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
          <Route path='/' element={<Login />} />
          <Route path='/auth/*' element={<AuthRoutes />} />
          <Route path='/dashboard/*' element={<LayoutContainer />} />
          <Route path='/404' element={<NotFound404 />} />
          <Route path='/career-choice' element={<CareerChoice />} /> 
          <Route path='/user-profile' element={<ProfilePage />} /> 
          <Route path='/user-result' element={<ResultPage />} /> 
           <Route path='/help' element={<HelpVideos />} /> 
          <Route path='*' element={<Navigate replace to='/404' />} />
        </Routes>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
