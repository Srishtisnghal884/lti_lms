import { apiSlice } from '../../App/api/apiSlice'; 

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({ 
    authentication: builder.query({
      query: ({auth}) => `/auth/lti/dashboard?auth=${auth}`,
    }),
    checkCandidateEligibility: builder.mutation({
      query: (credentials) => ({
        url: "assessments/checkCandidateEligibility",
        method: "POST",
        body: credentials,
        redirect: "follow"
      }),
    }),  
    inviteCandidate : builder.mutation({
      query: (credentials) => ({
        url: "assessments/invite_candidate",
        method: "POST",
        body: credentials,
        redirect: "follow"
      }),
    }), 
    checkExam : builder.mutation({
      query: (credentials) => ({
        url: "assessments/checkExam",
        method: "POST",
        body: credentials,
        redirect: "follow"
      }),
    }), 
    fetchAssessmentDetailsResultInPdf : builder.mutation({
      query: (credentials) => ({
        url: "assessments/fetchAssessmentDetailsResult",
        method: "POST",
        body: credentials,
        redirect: "follow"
      }),
    }), 
    deleteCandidate: builder.mutation({
      query: (credentials) => ({
        url: "assessments/checkCandidate",
        method: "POST",
        body: credentials,
        redirect: 'follow'
      })
    })
  }),
});

export const { 
  useAuthenticationQuery,
  useCheckCandidateEligibilityMutation, 
  useInviteCandidateMutation, 
  useCheckExamMutation, 
  useFetchAssessmentDetailsResultInPdfMutation,
  useDeleteCandidateMutation
 } = authApiSlice;
