import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { ArrowDropDown, KeyboardArrowRight } from '@mui/icons-material';
import {
  Box,
  Divider,
  Fab,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Popover,
  Select,
} from '@mui/material';

import {
  selectCurrentClassAssigned,
  selectCurrentClassId,
  selectCurrentRole,
  setClass,
} from '../../Features/Auth/AuthSlice';
import { PageTitle } from '../PageTitle';
import { getAuthDataFromLocalStorage } from '../../common/getDataFromLocal';
// import { UploadLogo } from '../UploadLogo';

export const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const assignedClasses = useSelector(selectCurrentClassAssigned);
  const role = useSelector(selectCurrentRole);
  const currentClassId = useSelector(selectCurrentClassId);

  const [classId, setClassId] = useState(currentClassId);
  const title = classId === 0 ? 'Select a class' : `Class ${classId}`;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'select-class' : undefined;

  // Selecting class
  const handleSubmit = () => {
    dispatch(setClass(classId));
    navigate(`${role}/${classId}`);
    handleClose();
  };
   const localData = getAuthDataFromLocalStorage(); 
 
  return (
    <> 
      <Box
        sx={{ 
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 0,
        }}
      > 
         <div>
           <PageTitle title={`Welcome`} /> 
        
         </div>
      </Box> 
    </>
  );
};
