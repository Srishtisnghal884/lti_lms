import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material';
import React from 'react';

export const PageTitle = ({ title }) => {
  const theme = useTheme();
  return (
    // Page Title
    <Box sx={{ my: 2 }}>
      <Typography
        variant='h4'
        fontWeight='500'
        sx={{ color: theme.palette.grey[700] }}
      >
        {title}
      </Typography>
    </Box>
  );
};
