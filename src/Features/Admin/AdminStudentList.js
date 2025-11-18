import React from "react";
import { useSelector } from "react-redux"; 
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid"; 
import { setSearchTerm } from "../Search/Searchslice";
import Loading from "../../Components/Loading"; 
import { CardWrapper } from "../../Components/CardWrapper";
import { CustomNoRowsOverlay } from "../../Components/NoRowsOverlay";
import { DownloadOutlined } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import Error from "../../Components/Error";

const AdminStudentList = () => {
    const theme = useTheme();
  // const { classId } = useParams(); // Retrieve classId from the URL parameters
  // Query hook for fetching studentData
  // const { data, isLoading, isSuccess, isError, error } =
  // useGetStudentDataQuery(classId);
  let isSuccess = true;
  let isLoading = false;
  let isError = false;

  //  Importing values of Search from AppBar Search
  //  Retrieving Search Term from Redux Store
  const { searchTerm } = useSelector(setSearchTerm);

  // Column for Data-Grid
  const columns = [
    {
      field: "id",
      headerName: "S No.",
      width: 100,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    }, 
    {
      field: "name",
      headerName: "Name",
      width: 200,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      renderCell: (params) => (
        <div
          style={{
            maxHeight: "100px",
            overflowY: "auto",
            fontSize: "12px", 
          }}
        >
            John Doe  {/* {params.value} */}
        </div>
      ),
    },
    {
      field: "item",
      headerName: "Address",
      width: 300,
      renderCell: (params) => (
        <div
          style={{
            maxHeight: "100px",
            overflowY: "auto",
            fontSize: "12px", 
          }}
        >
         Akshya Nagar 1st Block, Bangalore  {/* {params.value} */}
        </div>
      ),
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "contact",
      headerName: "Contact No.",
      width: 200,
      renderCell: (params) => (
        <div
          style={{
            maxHeight: "100px",
            overflowY: "auto",
            fontSize: "12px",
            fontWeight: "100",
          }}
        >
          +919999999999{/* {params.value} */}
        </div>
      ),
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "downloadPdf",
      headerName: "Download PDF",
      width: 150,
      renderCell: (params) => (
        <div style={{ justifyContent: "center", cursor: "pointer" }}>
          <DownloadOutlined />
        </div>
      ),
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
  ];
 
  let content;
 
  if (isLoading) {
    content = <Loading open={isLoading} />; // Show loading state while fetching data
  }
  // Render the staff container if data is successfully fetched
  else if (isSuccess) {
    content = (
      <CardWrapper title="Student List">
        <Box
          sx={{
            height: "100%",
            width: "100%",
            marginTop: "20px", 
            ' & .MuiDataGrid-cell:focus':{
                outline:"none"
            },
            '& .MuiDataGrid-columnHeader:focus':{
                outline:"none"
            },
            "& .super-app-theme--header": {
              fontWeight: "bold",
              fontSize: "16px",
              color: theme.palette.grey[700] 
            },
            "& .super-app-theme--cell": {
              fontWeight: "100",
              fontSize: "14px",
              color: theme.palette.grey[600]  
            },
            "& .MuiDataGrid-root": {
              fontSize: "14px",
            },
          }}
        >
          <DataGrid
            sx={{ 
            padding: "20px",
            color: "black", 
            border: "none",
            "& .MuiTablePagination-displayedRows": {
            color: theme.palette.grey[600]
            }
           }}
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
  else if (isError) {
    content = <Error error={isError} />;
  }
  return content;
};
export default  AdminStudentList
var dummyData = [
  {
    id: "1",
    name: "public",
    item: "Administration",
    score: 75,
  },
  {
    id: "2",
    name: "public",
    item: "Compliance",
    score: 75,
  },
  {
    id: "3",
    name: "public",
    item: "Citizen Services",
    score: 75,
  },
  {
    id: "4",
    name: "retail",
    item: "Store Ops",
    score: 75,
  },
  {
    id: "5",
    name: "retail",
    item: "Visual Merchandising",
    score: 75,
  },
  {
    id: "6",
    name: "retail",
    item: "E‑commerce",
    score: 75,
  },
  {
    id: "7",
    name: "digital",
    item: "SEO",
    score: 75,
  },
  {
    id: "8",
    name: "digital",
    item: "Performance Ads",
    score: 75,
  },
  {
    id: "9",
    name: "digital",
    item: "Content / Social",
    score: 75,
  },
  {
    id: "10",
    name: "digital",
    item: "Automation",
    score: 75,
  } 
];
