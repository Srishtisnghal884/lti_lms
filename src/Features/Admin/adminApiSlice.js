import { apiSlice } from '../../App/api/apiSlice';

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboard: builder.query({
      query: () => `admin/statics`,
      // providesTags: ['dashboard'],
    }),
    getLogoIcon: builder.query({
      query: () => `admin/get-logo`,
      // providesTags: ['dashboard'],
    }),
    getAdminStudentList: builder.query({
      query: ({ page = 1, pageSize = 10, email = "" }) =>
        `admin/student-list/${page}/${pageSize}/?searchEmail=${email}`,
      providesTags: ['StudentList'],
    }),
    getAdminStudentDetailsList: builder.query({
      query: ({ page = 1, pageSize = 10, email = "" }) =>
        `admin/studentDetailsResultList/${page}/${pageSize}/?searchEmail=${email}`,
      providesTags: ['StudentList'],
    }),
    getAdminStudentResultList: builder.query({
      query: ({ page = 1, pageSize = 10, email = "" }) =>
        `admin/studentResultList/${page}/${pageSize}/?searchEmail=${email}`,
      providesTags: ['StudentList'],
    }),
    getAssessmentList: builder.query({
      query: ({ page = 1, pageSize = 10, email = "" }) =>
        `admin/assessment-list/${page}/${pageSize}/?assessment=${email}`,
      providesTags: ['StudentList'],
    }),
    getUsers: builder.query({
      query: () => `dashboard/admin/users`,
      providesTags: ['users'],
      invalidatesTags: ['users'],
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `dashboard/admin/users`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['users'],
    }),

    deleteUser: builder.mutation({
      query: (email) => ({
        url: `dashboard/admin/users`,
        method: 'DELETE',
        body: email,
      }),
      invalidatesTags: ['users'],
    }),

    getClassData: builder.query({
      query: (classId) => `dashboard/admin/${classId}`,
      providesTags: ['timetable', 'staffdata'],
      invalidatesTags: ['timetable', 'staffdata'],
    }),

    updateTimetable: builder.mutation({
      query: ({ classId, data }) => ({
        url: `dashboard/admin/${classId}/timetable`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['timetable'],
    }),

    addStaffData: builder.mutation({
      query: ({ classId, data }) => ({
        url: `dashboard/admin/${classId}/staff/add-new`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['staffdata'],
    }),
    addLogoImage: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("logo", file); // BINARY FILE

        return {
          url: `admin/upload-logo`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["staffdata"],
    }),

    updateStaffData: builder.mutation({
      query: ({ classId, id, data }) => ({
        url: `dashboard/admin/${classId}/staffdata/${id}/update`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['staffdata'],
    }),

    deleteStaffData: builder.mutation({
      query: ({ classId, id, data }) => ({
        url: `dashboard/admin/${classId}/staffdata/${id}/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['staffdata'],
    }),
  }),
});

export const {
  useGetAdminDashboardQuery,
  useGetLogoIconQuery,
  useGetAdminStudentDetailsListQuery,
  useGetAdminStudentListQuery,
  useGetAdminStudentResultListQuery,
  useGetAssessmentListQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,

  useGetClassDataQuery,

  useUpdateTimetableMutation,

  useAddLogoImageMutation,
  useAddStaffDataMutation,
  useUpdateStaffDataMutation,
  useDeleteStaffDataMutation,
} = adminApiSlice;
