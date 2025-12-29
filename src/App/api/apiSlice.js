import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from '../../Global';
import { setCredentials } from '../../Features/Auth/AuthSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: API,
  // credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      // headers.set('Content-Type', 'application/json');
      
    }
    if (!token) {
      // headers.set("Content-Type", "application/x-www-form-urlencoded");
    }
    return headers;
  },
});
// Refresh Token
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    result?.error?.status === 401
  ) {
    return result;
  }


  if (result?.error?.status === 401) {
    console.log("1",result?.error?.data?.message);
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
    const accessToken = refreshResult.data;
    if (accessToken) {
      api.dispatch(setCredentials(accessToken));
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 401) {
        refreshResult.error.data.message =
          'Your login has expired. Please try again later.';
      }
      return refreshResult;
    }
  } else {
    if (result?.error?.data?.message === "jwt expired") {
      localStorage.clear();
      window.location.href = '/auth/login';
    }
  }
  return result;
};
// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   // ✅ CASE 1: LTI / login token invalid → STOP HERE
//   if (
//     result?.error?.status === 401 &&
//     result?.error?.data?.message === result?.error?.data?.message
//   ) {
//     return result; // ⛔ do NOT try refresh
//   }

//   // ✅ CASE 2: Access token expired → try refresh
//   if (
//     result?.error?.status === 401 &&
//     result?.error?.data?.message === "jwt expired"
//   ) {
//     const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

//     if (refreshResult?.data?.access?.token) {
//       api.dispatch(setCredentials(refreshResult.data.access));
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       localStorage.clear();
//       window.location.href = "/auth/login";
//       return refreshResult;
//     }
//   }

//   return result;
// };


export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Data'],
  endpoints: (builder) => ({}),
});
