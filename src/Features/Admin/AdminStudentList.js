
import React, { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Avatar, IconButton,
  Dialog, DialogContent, DialogTitle, TextField,
  Pagination, Drawer, Button, FormControl, InputLabel, Select, MenuItem,
  Box,
  Typography,Skeleton
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useGetAdminStudentListQuery } from "./adminApiSlice";
import { useNavigate } from "react-router-dom";
import DownloadIcon from '@mui/icons-material/Download';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
export default function AdminStudentList() {
  const [searchEmail, setSearchEmail] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [emailFilter, setEmailFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  // ---------------------- API CALL ----------------------
  const { data: apiData, isLoading, isError, refetch } = useGetAdminStudentListQuery({
    page,
    pageSize: rowsPerPage,
    name: nameFilter,
    email: emailFilter,
  });

  const handleView = (student) => {
    setSelectedStudent(student);
    setOpen(true);
  };
 const handleStudentView = (student) => {
  setSelectedStudent(student);  
  navigate('/admin/student-details', { state: student });
  setOpen(true);
};
 const { data: allData } = useGetAdminStudentListQuery({
    page: 1,
    pageSize: 1000000, // fetch all records dynamically
    name: nameFilter,
    email: emailFilter,
  });
const exportToExcel = () => {
    if (!allData?.data?.length) {

      console.warn("No data to export");
      return;
    }
    const exportData = allData.data.map((s, index) => ({
      "S.NO": index + 1,
      "Email": s.email,
      "Name": s?.first_name + s?.last_name,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "StudentList.xlsx");
  };
  const applyFilters = () => {
    setPage(1);
    refetch();
    setDrawerOpen(false);
  };

  const resetFilters = () => {
    setNameFilter("");
    setEmailFilter("");
    setPage(1);
    refetch();
    setDrawerOpen(false);
  };
 const paginatedData = filtered.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="student-list-table-wrapper">

      <TableContainer component={Paper} className="student-table-container">
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <h2 className="table-title">Result List</h2>
          <div> <Button
                      variant="contained"
                      startIcon={<DownloadIcon  sx={{color:"#fff"}} />}
                      onClick={exportToExcel}
                      style={{ marginRight: 10, backgroundColor: 'green', color: "#fff" }}
                    >
                      Export Excel
                    </Button><Button
            variant="contained"
            startIcon={<FilterListIcon  sx={{color:"#fff"}} />}
            onClick={() => setDrawerOpen(true)}
            style={{ backgroundColor: 'var(--themecolor)', color: "#fff" }}
          >
            Filter
          </Button></div>
        </Box>

        <Table className="student-table">
          <TableHead>
            <TableRow>
              <TableCell className="header-cell">S.NO</TableCell>
              <TableCell className="header-cell">Student</TableCell>
              <TableCell className="header-cell">Email</TableCell>
              {/* <TableCell className="header-cell">Attempt Count</TableCell> */}
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
                    {/* <TableCell><Skeleton width="40%" /></TableCell> */}
                    <TableCell><Skeleton width={30} /></TableCell>
                  </TableRow>
                ))
              :
            apiData?.data?.map((s, i) => (
              <TableRow key={s.id} className="row">
                <TableCell>{s.id} {i + 1}</TableCell>

                <TableCell className="student-info">
                  <Avatar className="avatar">{s?.first_name?.charAt(0)}</Avatar>
                  {s?.first_name}
                  {s?.last_name}
                </TableCell>

                <TableCell className="grade">{s.email}</TableCell>
                {/* <TableCell className="grade">{s.attemptCount}</TableCell> */}

                <TableCell>
                  <div className="actions">
                    {/* <IconButton className="edit-btn" size="small" onClick={() => handleView(s)}>
                      <VisibilityIcon fontSize="small" />
                    </IconButton> */}
                    <IconButton className="edit-btn" size="small" onClick={() => handleStudentView(s)}>
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
        <Pagination sx={{"& .MuiButtonBase-root ":{
          color:'#000', "&.Mui-selected":{
            opacity:'1',
            color:'#fff'
          }
        }}}
          count={apiData?.totalPages || 1}  
          page={Number(apiData?.currentPage) || 1}
          onChange={(e, v) => setPage(v)}   
        color="primary"
        />
      </div>

      {/* RIGHT SIDE FILTER DRAWER */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div style={{ width: 300, padding: 20 }}>
          <Typography variant="body" sx={{ color: '#333', marginBottom: 2, display: 'block' }}>Filter Students</Typography>

          {/* Email Filter */}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
            style={{ marginBottom: 20 }}
            InputLabelProps={{ style: { color: "#000" } }}
            inputProps={{ style: { color: "#000" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#000" },
                "&:hover fieldset": { borderColor: "#1976d2" },
              },
            }}
          />

          {/* Buttons */}
          <Button
            variant="contained"
            fullWidth
            style={{ marginBottom: 10 }}
            onClick={() => {
              applyFilters();
              setDrawerOpen(false);
            }}
          >
            Apply Filter
          </Button>

          <Button
            variant="outlined"
            fullWidth
            onClick={resetFilters}
          >
            Reset
          </Button>
        </div>
      </Drawer>

      {/* VIEW MODAL - UI UNCHANGED */}
      <Dialog open={open} onClose={() => setOpen(false)} className="cus-modal">
        <DialogTitle className="modal-title">Student Details</DialogTitle>

        <DialogContent className="modal-content">
          {selectedStudent && (
            <div className="modal-details">
              <div className="modal-row"><strong>ID:</strong> {selectedStudent.id}</div>
              <div className="modal-row"><strong>Name:</strong> {selectedStudent.first_name}</div>
              <div className="modal-row"><strong>Email:</strong> {selectedStudent.email}</div>
              <div className="modal-row"><strong>Attempt Count	:</strong> {selectedStudent.attemptCount}</div>

            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
