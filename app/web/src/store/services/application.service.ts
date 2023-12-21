import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import _api_url from '../../api/_api_url';
import { ApplicantsSubmission, IStatusApplication } from '../../types/roles';
import { APPLICATION_API_KEY } from '../constant';

const authToken = sessionStorage.getItem('authToken');

/**
 * Creates and exports an RTK Query API instance for making calls to the applicant API.
 * Uses createApi() from @reduxjs/toolkit/query/react to generate the API client.
 */
export const applicantApi = createApi({
  reducerPath: APPLICATION_API_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: _api_url.getApiUrl(),
    headers: {
      Authorization: authToken ? authToken : '',
    },
  }),
  tagTypes: ['applicants'],

  endpoints: (builder) => ({
    addApplicants: builder.mutation<ApplicantsSubmission, ApplicantsSubmission & { roleId: string }>({
      query: (body) => ({
        url: `applications`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApplicantsSubmission) => {
        console.log(response, 'response from query');
        return response;
      },
      transformErrorResponse: (response: any) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return message;
      },
      invalidatesTags: ['applicants'],
    }),
    deleteApplicant: builder.mutation<ApplicantsSubmission, { id: string }>({
      query: ({ id }) => ({
        url: `applications/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: ApplicantsSubmission) => {
        console.log(response, 'response from query');
        return response;
      },
      transformErrorResponse: (response: any) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return message;
      },
      invalidatesTags: ['applicants'],
    }),
    bulkDeleteApplicant: builder.mutation<ApplicantsSubmission, { id: string[] }>({
      query: ({ id }) => ({
        url: `applications`,
        method: 'DELETE',
        body: id,
      }),
      transformResponse: (response: ApplicantsSubmission) => {
        console.log(response, 'response from query');
        return response;
      },
      transformErrorResponse: (response: any) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return message;
      },
      invalidatesTags: ['applicants'],
    }),
    updateApplicant: builder.mutation<ApplicantsSubmission, { id: string; status: IStatusApplication }>({
      query: ({ id, status }) => ({
        url: `applications/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      transformResponse: (response: ApplicantsSubmission) => {
        console.log(response, 'response from query');
        return response;
      },
      transformErrorResponse: (response: any) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return message;
      },
      invalidatesTags: ['applicants'],
    }),
    getApplicants: builder.query<ApplicantsSubmission[], { roleid: string }>({
      query: ({ roleid }) => ({
        url: `applications/all/${roleid}`,
        method: 'GET',
        // body: roleid,
      }),
      transformResponse: (response: ApplicantsSubmission[]) => {
        console.log(response, 'response from query');
        return response;
      },
      transformErrorResponse: (response: any) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return message;
      },
      providesTags: (result) =>
        result ? [...result.map(({ id }) => ({ type: 'applicants' as const, id })), 'applicants'] : ['applicants'],
    }),
    getApplicant: builder.query<ApplicantsSubmission, { id: string }>({
      query: ({ id }) => ({
        url: `applications/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: ApplicantsSubmission) => {
        console.log(response, 'response from query');
        return response;
      },
      transformErrorResponse: (response: any) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return message;
      },
      providesTags: ['applicants'],
    }),
  }),
});

export const {
  useAddApplicantsMutation,
  useDeleteApplicantMutation,
  useUpdateApplicantMutation,
  useBulkDeleteApplicantMutation,
  useGetApplicantQuery,
  useGetApplicantsQuery,
} = applicantApi;
