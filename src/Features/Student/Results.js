// import React from "react";
// import { Link } from "react-router-dom";
// import { Box, CircularProgress } from "@mui/material";
// import Loading from "../../Components/Loading";
// import Error from "../../Components/Error";
// import { CardWrapper } from "../../Components/CardWrapper";
// import { CustomNoRowsOverlay } from "../../Components/NoRowsOverlay";
// import { PictureAsPdf, VisibilityRounded } from "@mui/icons-material";
// import { useTheme } from "@emotion/react";
// import { useGetStudentResultQuery } from "./studentApiSlice";
// import { getUserDataFromLocalStorage } from "../../common/getDataFromLocal";
// import { useState, useMemo } from "react";
// import { CLOUDINARY_URL } from "../../Global";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";

// export const Results = () => {
//   const theme = useTheme();
//   const localData = getUserDataFromLocalStorage();
//   const [page, setPage] = React.useState(1);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage + 1);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(1);
//   };

//   const { data, isLoading, isSuccess, isError, error } =
//     useGetStudentResultQuery({
//       email: localData?.email,
//       page: page,
//       pageSize: rowsPerPage,
//     });

//   // Normalise items array: support multiple backend shapes
//   const items = useMemo(() => {
//     if (!data?.data) return [];
//     // if data.data is already an array
//     if (Array.isArray(data.data)) return data.data;
//     // common shape: { totalCount, items } or { totalCount, data }
//     if (Array.isArray(data.data.items)) return data.data.items;
//     if (Array.isArray(data.data.data)) return data.data.data;
//     // fallback
//     return [];
//   }, [data]);
 
//   // Flatten and map rows for DataGrid
//   const rows = items.map((row, index) => { 
//     const zeroBasedPage = page - 1;
//     const serialNoStart = zeroBasedPage * rowsPerPage;

//     const flat = {
//       ...row,
//       serialNo: serialNoStart + index + 1 , 
//       id: row.id ?? `${page}-${index}`,  
//       assessmentName:
//         row.assessment_info?.name ?? row["assessment_info.name"] ?? "",
//       score: row.result_info?.score ?? row["result_info.score"] ?? "",
//       percentile:
//         row.result_info?.percentile ?? row["result_info.percentile"] ?? "",
//       pdf_url: row.result_info?.pdf_url ?? row["result_info.pdf_url"] ?? "",
//       started_at: row.started_at,
//     };
//     return flat;
//   });

//   // Columns - use flattened fields
//   const columns = [
//     {
//       Header: "S. No.",
//       accessor: "serialNo",
//       render: (row) => {
//         return <>{row?.serialNo ?? "_"}</>;
//       },
//     },
//     {
//       Header: "Date",
//       accessor: "started_at",
//       render: (row) => {
//         return (
//           <>{new Date(row?.started_at).toLocaleDateString("en-GB") ?? "_"}</>
//         );
//       },
//     },
//     {
//       Header: "AssessmentName",
//       accessor: "assessmentName",
//       render: (row) => {
//         return <>{row?.assessmentName ?? "_"}</>;
//       },
//     },
//     {
//       Header: "Score",
//       accessor: "score",
//       render: (row) => {
//         return <>{row?.score ?? "_"}</>;
//       },
//     },
//     {
//       Header: "Percentile",
//       accessor: "percentile",
//       render: (row) => {
//         return <>{row?.percentile ?? "_"}%</>;
//       },
//     },
//     {
//       Header: "Download PDF",
//       accessor: "downloadPDF",
//       render: (row) => {
//         return (
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             {row.pdf_url ? (
//               <Link
//                 to={`${CLOUDINARY_URL}/${row.pdf_url}`}
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 <PictureAsPdf
//                   titleAccess="Download PDF"
//                   color="success"
//                   style={{ cursor: "pointer", marginRight: 8 }}
//                 />
//               </Link>
//             ) : null}
//             <Link
//               to={`/user-result?assessment=${encodeURIComponent(
//                 row.assessmentName ?? ""
//               )}`}
//             >
//               <VisibilityRounded
//                 titleAccess="View"
//                 color="info"
//                 style={{ cursor: "pointer" }}
//               />
//             </Link>
//           </div>
//         );
//       },
//     },
//   ];

//   if (isLoading) return <Loading open={isLoading} />;
//   if (isError) return <Error error={error} />;
//   console.log("rowsss.", rows);

//   // Render
//   return (
//     <CardWrapper title="Results">
//       <Box
//         sx={{
//           height: "100%",
//           width: "100%",
//           marginTop: "20px",
//           "& .super-app-theme--header": {
//             fontWeight: "bold",
//             fontSize: "16px",
//             color: theme.palette.grey[700],
//           },
//           "& .super-app-theme--cell": {
//             fontWeight: "100",
//             fontSize: "14px",
//             color: theme.palette.grey[600],
//           },
//           "& .MuiDataGrid-root": {
//             fontSize: "14px",
//           },
//         }}
//       >
//         <Paper>
//           <TableContainer sx={{ maxHeight: 440 }}>
//             <Table stickyHeader aria-label="sticky table">
//               <TableHead>
//                 <TableRow hover role="checkbox" tabIndex={-1}>
//                   {columns?.map((column, index) => (
//                     <TableCell
//                       key={index}
//                       variant="head"
//                       align={"center"}
//                       style={{
//                         background: "#F3F6F9",
//                         border: "none",
//                         color: theme.palette.grey[700],
//                         fontSize: "15px", 
//                       }}
//                     >
//                       {column.Header}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {rows?.length === 0 ? (
//                   <TableRow>
//                     {
//                       <TableCell align="center" colSpan={columns?.length}>
//                         <CustomNoRowsOverlay />
//                       </TableCell>
//                     }
//                   </TableRow>
//                 ) : isLoading ? (
//                   <TableRow>
//                     <TableCell align="center" colSpan={columns?.length}>
//                       <CircularProgress />
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   rows?.map((row) => {
//                     return (
//                       <TableRow hover role="checkbox" tabIndex={1} key={row.id}>
//                         {columns?.map((col, idx) => {
//                           return (
//                             <TableCell
//                               style={{
//                                 border: "none",
//                                 color: theme.palette.grey[600],
//                                 alignItems: "center",
//                                 textAlign: "center",
//                                 fontSize: "14px",
//                                 fontWeight: "100",
//                               }}
//                               align="left"
//                               key={idx}
//                             >
//                               {col?.render
//                                 ? col?.render(row, idx)
//                                 : row[col?.accessor]}
//                             </TableCell>
//                           );
//                         })}
//                       </TableRow>
//                     );
//                   })
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             sx={{
//               color: theme.palette.grey[600],
//               "& .MuiSelect-icon": {
//                 fill: theme.palette.grey[600],
//               },
//             }}
//             rowsPerPageOptions={[2, 5, 10, 15, 25, 50]}
//             component="div"
//             count={data?.totalRecords}
//             rowsPerPage={rowsPerPage}
//             page={page - 1}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Paper>
//       </Box>
//     </CardWrapper>
//   );
// };




import React from "react";
import { Link } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import Loading from "../../Components/Loading";
import Error from "../../Components/Error";
import { CardWrapper } from "../../Components/CardWrapper";
import { CustomNoRowsOverlay } from "../../Components/NoRowsOverlay";
import { PictureAsPdf, VisibilityRounded } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { useGetStudentResultQuery } from "./studentApiSlice";
import { getUserDataFromLocalStorage } from "../../common/getDataFromLocal";
import { useState, useMemo } from "react";
import { CLOUDINARY_URL } from "../../Global";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

export const Results = () => {
  const theme = useTheme();
  const localData = getUserDataFromLocalStorage();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };

  const { data, isLoading, isSuccess, isError, error } =
    useGetStudentResultQuery({
      email: localData?.email,
      page: page,
      pageSize: rowsPerPage,
    });

  // Normalise items array: support multiple backend shapes
  const items = useMemo(() => {
    if (!data?.data) return [];
    // if data.data is already an array
    if (Array.isArray(data.data)) return data.data;
    // common shape: { totalCount, items } or { totalCount, data }
    if (Array.isArray(data.data.items)) return data.data.items;
    if (Array.isArray(data.data.data)) return data.data.data;
    // fallback
    return [];
  }, [data]);

  // Derive total records from several possible API response shapes
  const totalRecords = useMemo(() => {
    if (!data) return 0;
    // common top-level keys
    if (typeof data.totalRecords === "number") return data.totalRecords;
    if (typeof data.totalCount === "number") return data.totalCount;
    // nested inside data.data
    if (data.data) {
      if (typeof data.data.totalRecords === "number") return data.data.totalRecords;
      if (typeof data.data.totalCount === "number") return data.data.totalCount;
      if (typeof data.data.count === "number") return data.data.count;
      // if items array exists, use its length as a fallback
      if (Array.isArray(data.data.items)) return data.data.items.length;
      if (Array.isArray(data.data.data)) return data.data.data.length;
    }
    // fallback to top-level array shape
    if (Array.isArray(data)) return data.length;
    return items?.length ?? 0;
  }, [data, items]);

 
 
  // Flatten and map rows for DataGrid
  const rows = items.map((row, index) => { 
    const zeroBasedPage = page - 1;
    const serialNoStart = zeroBasedPage * rowsPerPage;

    // create a more stable id/key from available fields to avoid React reusing/mis-placing rows
    const stableId = `${row.id ?? "noId"}-${row["assessment_info.id"] ?? row.assessment_info?.id ?? "noAssess"}-$
{row.started_at ?? "noStart"}-${index}`;

    const flat = {
      ...row,
      serialNo: serialNoStart + index + 1,
      id: stableId,
      assessmentName:
        row.assessment_info?.name ?? row["assessment_info.name"] ?? "",
      score: row.result_info?.score ?? row["result_info.score"] ?? "",
      percentile:
        row.result_info?.percentile ?? row["result_info.percentile"] ?? "",
      pdf_url: row.result_info?.pdf_url ?? row["result_info.pdf_url"] ?? "",
      started_at: row.started_at,
    };
    return flat;
  });

  // Columns - use flattened fields
  const columns = [
    {
      Header: "S. No.",
      accessor: "serialNo",
      render: (row) => {
        return <>{row?.serialNo ?? "_"}</>;
      },
    },
    {
      Header: "Date",
      accessor: "started_at",
      render: (row) => {
        return (
          <>{new Date(row?.started_at).toLocaleDateString("en-GB") ?? "_"}</>
        );
      },
    },
    {
      Header: "AssessmentName",
      accessor: "assessmentName",
      render: (row) => {
        return <>{row?.assessmentName ?? "_"}</>;
      },
    },
    {
      Header: "Score",
      accessor: "score",
      render: (row) => {
        return <>{row?.score ?? "_"}</>;
      },
    },
    {
      Header: "Percentile",
      accessor: "percentile",
      render: (row) => {
        return <>{row?.percentile ?? "_"}%</>;
      },
    },
    {
      Header: "Download PDF",
      accessor: "downloadPDF",
      render: (row) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {row.pdf_url ? (
              <Link
                to={`${CLOUDINARY_URL}/${row.pdf_url}`}
                target="_blank"
                rel="noreferrer"
              >
                <PictureAsPdf
                  titleAccess="Download PDF"
                  color="success"
                  style={{ cursor: "pointer", marginRight: 8 }}
                />
              </Link>
            ) : null}
            <Link
              to={`/user-result?assessment=${encodeURIComponent(
                row.assessmentName ?? ""
              )}`}
            >
              <VisibilityRounded
                titleAccess="View"
                color="info"
                style={{ cursor: "pointer" }}
              />
            </Link>
          </div>
        );
      },
    },
  ];

  if (isLoading) return <Loading open={isLoading} />;
  if (isError) return <Error error={error} />;
  console.log("rowsss.", rows);

  // Render
  return (
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
        <Paper>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  {columns?.map((column, index) => (
                    <TableCell
                      key={index}
                      variant="head"
                      align={"center"}
                      style={{
                        background: "#F3F6F9",
                        border: "none",
                        color: theme.palette.grey[700],
                        fontSize: "15px", 
                      }}
                    >
                      {column.Header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {rows?.length === 0 ? (
                  <TableRow>
                    {
                      <TableCell align="center" colSpan={columns?.length}>
                        <CustomNoRowsOverlay />
                      </TableCell>
                    }
                  </TableRow>
                ) : isLoading ? (
                  <TableRow>
                    <TableCell align="center" colSpan={columns?.length}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : (
                  rows?.map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={1} key={row.id}>
                        {columns?.map((col, idx) => {
                          return (
                            <TableCell
                              style={{
                                border: "none",
                                color: theme.palette.grey[600],
                                alignItems: "center",
                                textAlign: "center",
                                fontSize: "14px",
                                fontWeight: "100",
                              }}
                              align="left"
                              key={idx}
                            >
                              {col?.render
                                ? col?.render(row, idx)
                                : row[col?.accessor]}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{
              color: theme.palette.grey[600],
              "& .MuiSelect-icon": {
                fill: theme.palette.grey[600],
              },
            }}
            rowsPerPageOptions={[2, 5, 10, 15, 25, 50]}
            component="div"
            count={totalRecords}
            rowsPerPage={rowsPerPage}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </CardWrapper>
  );
};
