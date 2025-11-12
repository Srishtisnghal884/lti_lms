import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Loading from "../../Components/Loading";
import Error from "../../Components/Error";
import { CardWrapper } from "../../Components/CardWrapper";
import { CustomNoRowsOverlay } from "../../Components/NoRowsOverlay";
import {
  DownloadOutlined,
  PictureAsPdf,
  Visibility,
  VisibilityRounded,
} from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { useGetStudentResultQuery } from "./studentApiSlice";
import { getUserDataFromLocalStorage } from "../../common/getDataFromLocal";
import { useState } from "react";
import { CLOUDINARY_URL } from "../../Global";

export const Results = () => {
  const theme = useTheme();
  const localData = getUserDataFromLocalStorage();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const { data, isLoading, isSuccess, isError, error } =
    useGetStudentResultQuery({
      email: localData?.email,
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize,
    });

  const totalCount = data?.data?.totalCount;

  const rows = data?.data?.map((row, index) => ({
    ...row,
    serialNo: paginationModel.page * paginationModel.pageSize + index + 1,
    id: row?.id ?? index,
  }));

  // Column for Data-Grid
  const columns = [
    {
      field: "serialNo",
      headerName: "S No.",
      width: 100,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "started_at",
      headerName: "Date",
      width: 100,
      renderCell: (params) => (
        <div
          style={{
            maxHeight: "100px",
            overflowY: "auto",
            fontSize: "12px",
            fontWeight: "100",
          }}
        >
          {new Date(params?.row?.started_at).toLocaleDateString()}
        </div>
      ),
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "assessment_info.name",
      headerName: "Assessment",
      width: 350,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "result_info.score",
      headerName: "Score",
      width: 100,
      renderCell: (params) => (
        <div
          style={{
            maxHeight: "100px",
            overflowY: "auto",
            fontSize: "12px",
            fontWeight: "100",
          }}
        >
          {params?.row?.["result_info.score"]}
        </div>
      ),
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "result_info.percentile",
      headerName: "Percentile",
      width: 150,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      renderCell: (params) => <>{params?.row?.["result_info.percentile"]}%</>,
    },
    {
      field: "downloadPdf",
      headerName: "Download PDF",
      with: "22%", 
      renderCell: (params) => (
        <div>
          <Link
            to={`${CLOUDINARY_URL}/${params?.row?.["result_info.pdf_url"]}`}
            target="_blank"
          >
            <PictureAsPdf color="success" style={{ cursor: "pointer", marginRight: 2 }} />
          </Link>
          <Link
            to={`/user-result?assessment=${params?.row?.["assessment_info.name"]}`}
          >
            <VisibilityRounded color="info" style={{ cursor: "pointer", marginLeft: 2 }} />
          </Link>
        </div>
      ),
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
  ];

  let content;
  if (isLoading) return <Loading open={isLoading} />;
  if (isError) return <Error error={error} />;

  // Render the result container if data is successfully fetched
  else if (isSuccess) {
    content = (
      <CardWrapper title="Results">
        <Box
          sx={{
            height: "100%",
            width: "100%",
            marginTop: "20px",
            "& .super-app-theme--header": {
              fontWeight: "bold",
              fontSize: "16px",
              color: theme.palette.grey[700],
            },
            "& .super-app-theme--cell": {
              fontWeight: "100",
              fontSize: "14px",
              color: theme.palette.grey[600],
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
              textAlign: "center",
              "& .MuiDataGrid-columnHeaderTitleContainer": {
                alignItems: "center",
                justifyContent: "center",
              },
              "& .MuiDataGrid-cell": {
                justifyContent: "center",
              },
              "& .MuiTablePagination-displayedRows": {
                color: theme.palette.grey[600],
              },
              "& .MuiTablePagination-root *": {
                color: theme.palette.grey[600], // example: change text color
                fontSize: "14px",
              },
              "& .MuiTablePagination-root svg": {
                fill: theme.palette.grey[600],
                 
              },
            }}
            rows={rows}
            columns={columns}
            autoHeight
            rowCount={totalCount}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            paginationMode="server"
            pageSizeOptions={[2, 3, 10, 20, 50]}
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
  return content;
};
