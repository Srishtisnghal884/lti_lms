import React from 'react';
import { Box, Typography } from '@mui/material';
import ErrorGif from '../Assets/Images/404.gif';
import { useTheme } from '@emotion/react';

const NotFound404 = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        m: 2,
        p: 2,
      }}
    >
      <Box>
        <img src={ErrorGif} alt='error' />
      </Box>
      <Box>
        <Typography variant='h5' color={theme.palette.primary.main} textAlign='center'>
          Oops! Requested resource does not exist
        </Typography>
      </Box>
    </Box>
  );
};

export default NotFound404;
