
import React, { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Avatar, IconButton,
  Dialog, DialogContent, DialogTitle, TextField,
  Pagination, Drawer, Button, FormControl, InputLabel, Select, MenuItem,
  Box,
  Typography, Skeleton
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useGetAdminStudentDetailsListQuery } from "./adminApiSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { CLOUDINARY_URL } from "../../Global";

export default function StudentDetailsResultD() {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const location = useLocation();
  const passedEmail = location.state?.email;

  // ---------------------- API CALL ----------------------
  const { data: apiData, isLoading, isError, refetch } = useGetAdminStudentDetailsListQuery({
    page,
    pageSize: rowsPerPage,
    email: passedEmail,
  });

  const handleView = (student) => {

    // Correct way: access flattened key
    const pdfUrl = student["result_info.pdf_url"];

    if (!pdfUrl) {
      return;
    }

    const fileUrl = `${CLOUDINARY_URL}/${pdfUrl}`;
    window.open(fileUrl, "_blank");
  };





  return (
    <div className="student-list-table-wrapper">

      <TableContainer component={Paper} className="student-table-container">
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <h2 className="table-title">Email :- {location.state?.email}</h2>

        </Box>

        <Table className="student-table">
          <TableHead>
            <TableRow>
              <TableCell className="header-cell">S.NO</TableCell>
              <TableCell className="header-cell">Exam Date</TableCell>
              <TableCell className="header-cell">Main Career  Exam Name</TableCell>
              <TableCell className="header-cell">Sub Career Exam Name</TableCell>
              <TableCell className="header-cell">Raw score</TableCell>
              <TableCell className="header-cell">Percentile</TableCell>
              <TableCell className="header-cell action-column">Action</TableCell>

            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading
              ? Array.from(new Array(rowsPerPage)).map((_, i) => (
                <TableRow key={i} className="row">
                  <TableCell ><Skeleton width={30} /></TableCell>
                  <TableCell className="student-info">
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton width="60%" sx={{ display: "inline-block", ml: 1 }} />
                  </TableCell>
                  <TableCell><Skeleton width="80%" /></TableCell>
                  <TableCell><Skeleton width="40%" /></TableCell>
                  <TableCell><Skeleton width="40%" /></TableCell>
                  <TableCell><Skeleton width="40%" /></TableCell>
                  <TableCell><Skeleton width="40%" /></TableCell>
                </TableRow>
              ))
              :
              apiData?.data?.map((s, i) => (
                <TableRow key={s.id} className="row">
                  <TableCell> {i + 1}</TableCell>
                  <TableCell className="grade">{new Date(s["started_at"])?.toLocaleDateString("en-GB").replace(/\//g, "-")}</TableCell>
                  <TableCell className="grade">{s['assessment_info.main_career']}</TableCell>
                  <TableCell className="grade">{s['assessment_info.sub_career']}</TableCell>
                  <TableCell className="grade">{s['result_info.score']}%</TableCell>
                  <TableCell className="grade">{s['result_info.percentile']}</TableCell>
                  <TableCell>
                    <div className="actions">
                      <IconButton className="edit-btn" size="small" onClick={() => handleView(s)}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>

                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* PAGINATION */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Pagination sx={{
          "& .MuiButtonBase-root ": {
            color: '#000', "&.Mui-selected": {
              opacity: '1',
              color: '#fff'
            }
          }
        }}
          count={apiData?.totalPages || 1}
          page={Number(apiData?.currentPage) || 1}
          onChange={(e, v) => setPage(v)}
          color="primary"
        />
      </div>


    </div>
  );
}
