import { useTheme } from '@emotion/react';
import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  logout,
  selectCurrentRole,
  selectCurrentUser,
} from '../../Features/Auth/AuthSlice';
import dayjs from 'dayjs';
import { getUserDataFromLocalStorage } from '../../common/getDataFromLocal';

export const UserProfile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const role = useSelector(selectCurrentRole); 
  const localData = getUserDataFromLocalStorage()

  const getGreeting = useMemo(() => {
    const currentTime = dayjs();
    const hour = currentTime.hour();

    if (hour >= 5 && hour < 12) {
      return 'Good Morning';
    } else if (hour >= 12 && hour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Paper
      sx={{
        backgroundColor: theme.palette.mode === 'light' && '#fff',
        p: 2,
      }}
    >
      <Grid container sx={{minWidth: "250px"}} spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant='h6'
            sx={{
              fontWeight: '500',
              color: '#f25d2c' // theme.palette.primary.main,
            }}
          >
            {getGreeting} 
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography variant='subtitle1' sx={{ fontWeight: '500', color: '#f25d2c' }}>
              {localData?.name}
            </Typography>
          </Box>
          {/* <Box>
            <Typography
              variant='body2'
              sx={{ color: '#f25d2c' }}
              // sx={{ color: theme.palette.text.secondary }}
            >
              {localData?.email}
            </Typography>
          </Box> */}
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant='contained'
            color='primary'
             sx={{ color: '#ffff', backgroundColor: '#f25d2c' }}
            // sx={{ color: theme.palette.primary.contrastText }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
