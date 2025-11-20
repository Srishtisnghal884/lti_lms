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
  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
    const accessToken = refreshResult.data;
    if (accessToken) {
      api.dispatch(setCredentials(accessToken));
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("jwt expiresadasdsa");

      if (refreshResult?.error?.status === 401) {
        refreshResult.error.data.message =
          'Your login has expired. Please try again later.';
      }
      return refreshResult;
    }
  } else {
    console.log("jwt expiresadasdsa", result?.error?.data?.message);
    if (result?.error?.data?.message === "jwt expired") {
      localStorage.clear();

      // Redirect to login page
      window.location.href = '/auth/login';
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Data'],
  endpoints: (builder) => ({}),
});
