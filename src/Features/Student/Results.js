import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

// import { useGetStudentDataQuery } from './studentApiSlice';
import { setSearchTerm } from '../Search/Searchslice';
import Loading from '../../Components/Loading';
// import Error from '../../Components/Error';
import { CardWrapper } from '../../Components/CardWrapper';
import { CustomNoRowsOverlay } from '../../Components/NoRowsOverlay';

export const Results = () => {
  const { classId } = useParams(); // Retrieve classId from the URL parameters
  // Query hook for fetching studentData
  // const { data, isLoading, isSuccess, isError, error } =
  // useGetStudentDataQuery(classId);
  let isSuccess = true;
  let isLoading = false;
  
  //  Importing values of Search from AppBar Search
  //  Retrieving Search Term from Redux Store
  const { searchTerm } = useSelector(setSearchTerm);

  // Column for Data-Grid
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'examType', headerName: 'Examination Name', width: 200 },
    {
      field: 'description',
      headerName: 'Description',
      width: 900,
      renderCell: (params) => (
        <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
          {params.value}
        </div>
      ),
    },
  ];

  const dummyData = [
    {id: 1, examType: "Entrance Examination",description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
    {id: 2, examType: "Entrance Examination",description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
    {id: 3, examType: "Entrance Examination",description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
    {id: 4, examType: "Entrance Examination",description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },

  ]

  // For Searching through Data
  // const filteredData = data?.results?.filter((item) => {
  //   const term = searchTerm ?? '';
  //   if (term.trim() === '') return true;
  //   return (
  //     item.id?.toLowerCase().includes(term) ||
  //     item.examType?.toLowerCase().includes(term) ||
  //     item.description?.toLowerCase().includes(term)
  //   );
  // });

  let content;

  // content = (
  //     <CardWrapper title='Results'>
  //       <Box sx={{ height: '100%', width: '100%', marginTop: '20px' }}>
  //         <DataGrid
  //           style={{ padding: '20px' }}
  //           rows={dummyData}
  //           columns={columns}
  //           autoHeight
  //           pageSizeOptions={[10]}
  //           initialState={{
  //             pagination: {
  //               paginationModel: {
  //                 pageSize: 10,
  //               },
  //             },
  //           }}
  //           slots={{
  //             noRowsOverlay: CustomNoRowsOverlay,
  //           }}
  //         />
  //       </Box>
  //     </CardWrapper>
  //   );
  if (isLoading) {
    content = <Loading open={isLoading} />; // Show loading state while fetching data
  }
  // Render the staff container if data is successfully fetched
  else if (isSuccess) {
    content = (
      <CardWrapper title='Results'>
        <Box sx={{ height: '100%', width: '100%', marginTop: '20px' }}>
          <DataGrid
            style={{ padding: '20px' }}
            rows={dummyData}
            columns={columns}
            autoHeight
            pageSizeOptions={[10]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
            }}
          />
        </Box>
      </CardWrapper>
    );
  }
  // Show error message if there's an error fetching data
  // else if (isError) {
  //   content = <Error error={error} />;
  // }
  return content;
};
