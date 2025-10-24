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
import { DownloadOutlined } from '@mui/icons-material';

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
    { field: 'id', headerName: 'S No.', width: 100 },
    { field: 'name', headerName: 'Examination Name', width: 300 },
    {
      field: 'item',
      headerName: 'Skill',
      width: 300, 
      renderCell: (params) => (
        <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'downloadPdf',
      headerName: 'Download PDF',
      width: 300, 
      renderCell: (params) => (
        <div style={{ justifyContent: 'center', cursor: "pointer" }}>
           <DownloadOutlined/>
        </div>
      ),
    },
  ]; 
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
var dummyData = [
  {
    "id": "1",
    "name": "public",
    "item": "Administration"
  },
  {
    "id": "2",
    "name": "public",
    "item": "Compliance"
  },
  {
    "id": "3",
    "name": "public",
    "item": "Citizen Services"
  },
  {
    "id": "4",
    "name": "retail",
    "item": "Store Ops"
  },
  {
    "id": "5",
    "name": "retail",
    "item": "Visual Merchandising"
  },
  {
    "id": "6",
    "name": "retail",
    "item": "E‑commerce"
  },
  {
    "id": "7",
    "name": "digital",
    "item": "SEO"
  },
  {
    "id": "8",
    "name": "digital",
    "item": "Performance Ads"
  },
  {
    "id": "9",
    "name": "digital",
    "item": "Content / Social"
  },
  {
    "id": "10",
    "name": "digital",
    "item": "Automation"
  },
  {
    "id": "11",
    "name": "hr",
    "item": "Recruitment"
  },
  {
    "id": "12",
    "name": "hr",
    "item": "Payroll"
  },
  {
    "id": "13",
    "name": "hr",
    "item": "L&D"
  },
  {
    "id": "14",
    "name": "hr",
    "item": "HR Analytics"
  },
  {
    "id": "15",
    "name": "education",
    "item": "Teaching"
  },
  {
    "id": "16",
    "name": "education",
    "item": "Curriculum"
  },
  {
    "id": "17",
    "name": "education",
    "item": "EdTech"
  },
  {
    "id": "18",
    "name": "project",
    "item": "PMO"
  },
  {
    "id": "19",
    "name": "project",
    "item": "Agile / Scrum"
  },
  {
    "id": "20",
    "name": "project",
    "item": "Delivery"
  },
  {
    "id": "21",
    "name": "sales",
    "item": "B2B"
  },
  {
    "id": "22",
    "name": "sales",
    "item": "Inside Sales"
  },
  {
    "id": "23",
    "name": "sales",
    "item": "Account Mgmt"
  }
];