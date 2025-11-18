import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card } from '@mui/material';

import Loading from '../../Components/Loading';
import Error from '../../Components/Error';
import { SummaryBox } from '../../Components/Boxes/SummaryBox';
import UploadLogo from '../../Components/UploadLogo';
const AdminDashboard = () => {
  const { classId } = useParams(); // Retrieve classId from the URL parameters
  const isLoading = false;

  let content;

  if (isLoading) {
    content = <Loading open={isLoading} />; // Show loading state while fetching data
  }
  // Render the staff container if data is successfully fetched
  // else if (isSuccess) {
    content = (
      <Box sx={{ mt: 2 }}>
        <SummaryBox /> 
         <Box sx={{mt:4}}>
              <Card xs={{ textAlign: 'left', marginTop: 2, padding: 2 }}>
               <UploadLogo />
              </Card>
             </Box> 
      </Box>
    );
  // }
  // Show error message if there's an error fetching data
  // else if (isError) {
  //   content = <Error error={error} />;
  // }
  return content;
};

export default AdminDashboard;
