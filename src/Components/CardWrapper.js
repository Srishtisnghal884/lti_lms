import React from 'react';
import { Box, Divider, Paper, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';

export const CardWrapper = ({ title, children }) => {
  const theme = useTheme();
  return (
    <Box sx={{ mt: 3 }}>
      <Paper
        sx={{
          backgroundColor: '#fff',//theme.palette.mode === 'light' ? '#fff' : '#1a2027',
          pb: 1,
        }}
      > 
      <Typography variant='h6' sx={{ px: 4, pt: 2, fontWeight: 600 , color: "#616161"}}>
         {title}
      </Typography> 
        <Box sx={{ mx: 2 }}>{children}</Box>
      </Paper>
    </Box>
  );
};
