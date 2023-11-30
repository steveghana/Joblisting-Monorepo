import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import _api_url from "../../api/_api_url";
import { ApplicantsSubmission, IRoleData } from "../../types/roles";

export const APPLICATION_API_KEY = "ApplcationApi";

export const applicantApi = createApi({
  reducerPath: APPLICATION_API_KEY,
  baseQuery: fetchBaseQuery({ baseUrl: _api_url.getApiUrl() }), // Replace with your actual API URL
  endpoints: (builder) => ({
    addApplicants: builder.mutation<
      ApplicantsSubmission,
      ApplicantsSubmission & { roleId: string }
    >({
      query: (body) => ({
        url: `applications`, // Replace with the appropriate API endpoint
        method: "POST",
        body,
      }),
      transformResponse: (response: ApplicantsSubmission, meta) => {
        console.log(response, "response from query");
        return response;
      },
      transformErrorResponse: (response: any, meta, arg) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return message;
      },
    }),
    deleteApplicant: builder.mutation<ApplicantsSubmission, { id: string }>({
      query: ({ id }) => ({
        url: `applications/${id}`, // Replace with the appropriate API endpoint
        method: "DELETE",
      }),
      transformResponse: (response: ApplicantsSubmission, meta) => {
        console.log(response, "response from query");
        return response;
      },
      transformErrorResponse: (response: any, meta, arg) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return message;
      },
    }),
    updateApplicant: builder.mutation<
      ApplicantsSubmission,
      Partial<ApplicantsSubmission> & { id: string }
    >({
      query: (body) => ({
        url: `applications/${body.id}`, // Replace with the appropriate API endpoint
        method: "PATCH",
        body,
      }),
      transformResponse: (response: ApplicantsSubmission, meta) => {
        console.log(response, "response from query");
        return response;
      },
      transformErrorResponse: (response: any, meta, arg) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return message;
      },
    }),
    getApplicants: builder.query<ApplicantsSubmission[], { roleid: string }>({
      query: ({ roleid }) => ({
        url: `applications/all/${roleid}`, // Replace with the appropriate API endpoint
        method: "GET",
        // body: roleid,
      }),
      transformResponse: (response: ApplicantsSubmission[], meta) => {
        console.log(response, "response from query");
        return response;
      },
      transformErrorResponse: (response: any, meta, arg) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return message;
      },
    }),
    getApplicant: builder.query<ApplicantsSubmission, { id: string }>({
      query: ({ id }) => ({
        url: `applications/${id}`, // Replace with the appropriate API endpoint
        method: "GET",
      }),
      transformResponse: (response: ApplicantsSubmission, meta) => {
        console.log(response, "response from query");
        return response;
      },
      transformErrorResponse: (response: any, meta, arg) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return message;
      },
    }),
  }),
});

export const {
  useAddApplicantsMutation,
  useDeleteApplicantMutation,
  useUpdateApplicantMutation,
  useGetApplicantQuery,
  useGetApplicantsQuery,
} = applicantApi;