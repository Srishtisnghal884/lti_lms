import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { getAuthDataFromLocalStorage } from '../../common/getDataFromLocal';

const setAuthDataInLocalStorage = (token, role) => {
  localStorage.setItem('accessToken', token);
  localStorage.setItem('userRole', role);
};

const getInitialAuthState = () => {
  const token = localStorage.getItem('accessToken');
  const role = localStorage.getItem('userRole');
  
  // NOTE: You might want to add token expiration check here
  
  return {
    token: token || null,
    role: role || null,
    user: null, // User details might need to be retrieved or decoded too
    classAssigned: null, 
  };
};

const initialState = getInitialAuthState()

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setCredentials: (state, action) => {
     const { token } = action.payload;  
    //  const isAuthenticated =  getAuthDataFromLocalStorage();

      const accessToken = token;
      const decodeToken = jwtDecode(accessToken);
      // const decodeToken = isAuthenticated;
      const role = decodeToken?.roleId || 3;
      const user = decodeToken?.userId;

      state.token = accessToken;
      state.role = role;
      state.user = user;
      // state.classAssigned = classAssigned;
      setAuthDataInLocalStorage(accessToken, role);
    },
    setClass: (state, action) => {
      const classId = action.payload;
      state.classId = [classId];
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.user = null;
      state.classAssigned = null;
      state.classId = 0;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userData');
    },
  },
});

export const { setCredentials, logout, setClass } = authSlice.actions;

export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentRole = (state) => state.auth.role;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentClassAssigned = (state) => state.auth.classAssigned;
export const selectCurrentClassId = (state) => state.auth.classId;

export default authSlice.reducer;
