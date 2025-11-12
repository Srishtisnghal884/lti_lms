import React from "react";
import { useSelector } from "react-redux"; 
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid"; 
import { setSearchTerm } from "../Search/Searchslice";
import Loading from "../../Components/Loading"; 
import Error from "../../Components/Error";
import { CardWrapper } from "../../Components/CardWrapper";
import { CustomNoRowsOverlay } from "../../Components/NoRowsOverlay";
import { DownloadOutlined } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

export const Courses = () => {
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
      field: "date",
      headerName: "Date",
      width: 150,
      renderCell: (params) => (
        <div
          style={{
            maxHeight: "100px",
            overflowY: "auto",
            fontSize: "12px",
            fontWeight: "100",
          }}
        >
          {new Date().toLocaleDateString()}
        </div>
      ),
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "name",
      headerName: "Assessment",
      width: 200,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "item",
      headerName: "Skill",
      width: 200,
      renderCell: (params) => (
        <div
          style={{
            maxHeight: "100px",
            overflowY: "auto",
            fontSize: "12px", 
          }}
        >
          {params.value}
        </div>
      ),
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "score",
      headerName: "Score",
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
          {params.value}
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
      <CardWrapper title="All Courses">
        <Box
          sx={{
            height: "100%",
            width: "100%",
            marginTop: "20px", 
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
  },
  {
    id: "11",
    name: "hr",
    item: "Recruitment",
    score: 75,
  },
  {
    id: "12",
    name: "hr",
    item: "Payroll",
    score: 75,
  },
  {
    id: "13",
    name: "hr",
    item: "L&D",
    score: 75,
  },
  {
    id: "14",
    name: "hr",
    item: "HR Analytics",
    score: 75,
  },
  {
    id: "15",
    name: "education",
    item: "Teaching",
    score: 75,
  },
  {
    id: "16",
    name: "education",
    item: "Curriculum",
    score: 75,
  },
  {
    id: "17",
    name: "education",
    item: "EdTech",
    score: 75,
  },
  {
    id: "18",
    name: "project",
    item: "PMO",
    score: 75,
  },
  {
    id: "19",
    name: "project",
    item: "Agile / Scrum",
    score: 75,
  },
  {
    id: "20",
    name: "project",
    item: "Delivery",
    score: 75,
  },
  {
    id: "21",
    name: "sales",
    item: "B2B",
    score: 75,
  },
  {
    id: "22",
    name: "sales",
    item: "Inside Sales",
    score: 75,
  },
  {
    id: "23",
    name: "sales",
    item: "Account Mgmt",
    score: 75,
  },
];
