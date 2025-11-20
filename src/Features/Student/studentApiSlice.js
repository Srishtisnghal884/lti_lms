// import { apiSlice } from '../../App/api/apiSlice';

// export const studentApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getStudentData: builder.query({
//       query: (classId) => `dashboard/student/${classId}`,
//     }),
//   }),
//    endpoints: (builder) => ({
//     getStudentResult: builder.query({
//       query: ({ email, page = 1, pageSize = 10 }) => `assessments/getResult/${email}/${page}/${pageSize}`,
//     }),
//   }),
// });

// export const { useGetStudentDataQuery, 
//   useGetStudentResultQuery } = studentApiSlice;


import { apiSlice } from '../../App/api/apiSlice';

export const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudentData: builder.query({
      query: (classId) => `dashboard/student/${classId}`,
    }),
    getStudentResult: builder.query({
      query: ({ email, page = 1, pageSize = 10 }) =>
        `assessments/getResult/${email}/${page}/${pageSize}`,

      providesTags: (result, error, arg) => [
        { type: "Data", id: `results-${arg.email}` },
      ],
    }),
    
  }),
  //  endpoints: (builder) => ({
  //   getStudentResult: builder.query({
  //     query: ({ email, page = 1, pageSize = 10 }) => `assessments/getResult/${email}/${page}/${pageSize}`,
  //   }),
  // }),
});

export const { useGetStudentDataQuery, 
  useGetStudentResultQuery } = studentApiSlice;
