import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Divider, Drawer, Fab, Hidden, Typography } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import styled from '@emotion/styled';
import MuiDrawer from '@mui/material/Drawer';

import {
  selectLgView,
  selectMobView,
  toggleLgView,
  toggleMobView,
} from '../../Features/ToggleSideBar/ToggleSidebarSlice';
import Logo from '../../Assets/Images/logo512.png';
import { SideNavLinks } from './SideNavLinks';
import { drawerWidth, fullDrawerWidth } from './DrawerWidth';
import { useTheme } from '@emotion/react';

const StyledBox = styled(Box)(() => ({
  textAlign: 'center',
  margin: '20px',
}));

// For toggling the drawer sideways (visible above md screens)
const openedMixin = (theme) => ({
  width: fullDrawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

// For toggling the drawer sideways (visible above md screens)
const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: drawerWidth,
});
// Side Drawer Header
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'center',
}));

// Sidebar Drawer above md screens
const DrawerWide = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'openWide',
})(({ theme, openWide }) => ({
  width: fullDrawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  border: 'none',
  ...(openWide && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!openWide && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export const SidebarWrapper = () => {
  const dispatch = useDispatch();
  const open = useSelector(selectMobView);
  const openWide = useSelector(selectLgView);
  const theme = useTheme()

  const handleDrawer = () => {
    dispatch(toggleLgView());
    dispatch(toggleMobView());
  };
  const userRole = localStorage.getItem("userRole")
  console.log(userRole,"userRoleuserRoleuserRole");
  
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("userRole");
    localStorage.removeItem("persist");

    // OR clear everything:
    // localStorage.clear();

    window.location.href = "/login";  // redirect to login page
  };

  return (
    <>
      {/* ---- Side Drawer for mob screens ---- */}
      {/* <Hidden smUp>
        <Drawer
          sx={{
            width: drawerWidth, 
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              boxShadow: 3,
              borderRight: 'none',
              background: "green"
            },
          }}
          variant='persistent'
          anchor='left'
          open={open}
        >
          <DrawerHeader>
            <div>
              <img src={'/ECAIcon.png'} alt='logo' height='32' width='32' />
            </div>
          </DrawerHeader>

          <Divider variant='middle' /> 
          <SideNavLinks />
        </Drawer>
      </Hidden> */}

      {/* --- Side drawer for tab and desktop screens --- */}
      <Hidden smDown>
        <DrawerWide
          variant='permanent'
          openWide={openWide}
          PaperProps={{
            sx: {
              borderRight: 'none',
              background: 'white', mt: '80px', height: 'calc(100vh - 80px)' //'#ebebebff'
            },
          }}
        >
          {/* <DrawerHeader> 
            <Typography
              variant="h6"
              component="h4"
              sx={{
                color: "black",
                fontWeight: 500,
                textAlign: "center",
                width: "100%",
                maxWidth: "400px",
                mt: 2,
                whiteSpace: "break-spaces",
                "@media (max-width: 900px)": {
                  textAlign: "center",
                },
              }}
            >
              Employability  Advantage
            </Typography> <div>
              <img src={"/ECAIcon.png"} alt='logo' height='32' width='32' />
            </div> 
          </DrawerHeader>*/}

          <Divider variant='middle' />

          {/* --- Nav Links--- */}
          <SideNavLinks openWide={openWide} />
          {userRole == 1 ? (
           <Box 
              sx={{padding:'0 5px',  marginTop: "auto", mb:2 }}
           >
             <Button
              variant="contained"
              // color="error"
              onClick={handleLogout}
              sx={{bg:'var(--themecolor)',width:'100%'}}
            >
              Logout
            </Button>
           </Box>
          ): ( <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 'auto',
            }}
          >
            <StyledBox onClick={handleDrawer}>
              {openWide ? (
                <Fab sx={{ backgroundColor: theme.palette.primary.main }} size='small'>
                  <KeyboardArrowLeft />
                </Fab>
              ) : (
                <Fab sx={{ backgroundColor: theme.palette.primary.main }} size='small'>
                  <KeyboardArrowRight />
                </Fab>
              )}
            </StyledBox>
          </Box>)} 

          {/* ----- Side bar Toggle Arrow Button -----  */}
         
        </DrawerWide>
      </Hidden>
    </>
  );
};
