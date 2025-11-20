import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { styled, textAlign } from '@mui/system';
import { alpha } from '@mui/material/styles';
import { Hidden,Box,Card } from '@mui/material';

import {
  selectLgView,
  selectMobView,
} from '../../Features/ToggleSideBar/ToggleSidebarSlice';
import { NavBar } from './Navbar';
import { SidebarWrapper } from './SidebarWrapper';
import { drawerWidth, fullDrawerWidth } from './DrawerWidth';
import DashboardRoutes from '../../Routes/DashboardRoutes';
import { selectCurrentRole, setCredentials } from '../../Features/Auth/AuthSlice';
import { LandingPage } from './LandingPage';

 
const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'openWide' && prop !== 'isFullScreen', 
})
(({ theme, open, openWide, isFullScreen }) => ({  
  flexGrow: 1, 
  padding: isFullScreen ? theme.spacing(0) : theme.spacing(3),  
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: isFullScreen ? 0 : 0, 
  marginTop: isFullScreen ? 0 : 60,
  backgroundColor: isFullScreen ? theme.palette.background.default : alpha(theme.palette.grey[400], 0.15),  
  [theme.breakpoints.up('sm')]: {
    marginLeft: isFullScreen ? 0 : `${drawerWidth}px`, 
  },
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: isFullScreen ? 0 : `${drawerWidth}px`,  
  }),
  ...(openWide && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: isFullScreen ? 0 : `${fullDrawerWidth}px !important`,  
  }), 
}));

export const LayoutContainer = () => { 

  const role = useSelector(selectCurrentRole);
  const open = useSelector(selectMobView);
  const openWide = useSelector(selectLgView);

  const location = useLocation(); 
  const isFullScreenRoute = 
    location.pathname.includes('/employability') || 
    location.pathname.includes('/career-choice');

  return (
    <>
      {!!role ? (
        <>
         {!isFullScreenRoute && <NavBar />}
          {!isFullScreenRoute && <SidebarWrapper />}
          <Hidden smUp>
            <Main open={open} isFullScreen={isFullScreenRoute}>
             {!isFullScreenRoute && <LandingPage />}
              <DashboardRoutes />
              <Outlet />
            </Main>
          </Hidden>
          <Hidden smDown>
            <Main openWide={openWide} isFullScreen={isFullScreenRoute}>
              {!isFullScreenRoute && <LandingPage />}
              <DashboardRoutes />
              <Outlet />
            </Main>
          </Hidden>
        </>
      ) : (
        <Navigate to='/auth/login' />
      )}
    </>
  );
};
