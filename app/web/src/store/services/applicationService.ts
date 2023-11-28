import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import _api_url from "../../api/_api_url";
import { ApplicantsSubmission, IRoleData } from "../../types/roles";

export const APPLICATION_API_KEY = "RoleApi";

export const applicantApi = createApi({
  reducerPath: APPLICATION_API_KEY,
  baseQuery: fetchBaseQuery({ baseUrl: _api_url.getApiUrl() }), // Replace with your actual API URL
  endpoints: (builder) => ({
    addApplicants: builder.query<
      ApplicantsSubmission,
      ApplicantsSubmission & { roleId: string }
    >({
      query: (body) => ({
        url: `applications/`, // Replace with the appropriate API endpoint
        method: "POST",
        body,
      }),
    }),
    deleteApplicant: builder.query<ApplicantsSubmission, { id: string }>({
      query: ({ id }) => ({
        url: `applications/:${id}`, // Replace with the appropriate API endpoint
        method: "DELETE",
      }),
    }),
    updateApplicant: builder.query<
      ApplicantsSubmission,
      Partial<ApplicantsSubmission> & { id: string }
    >({
      query: (body) => ({
        url: `applications/:${body.id}`, // Replace with the appropriate API endpoint
        method: "PATCH",
        body,
      }),
    }),
    getApplicants: builder.query<ApplicantsSubmission[], void>({
      query: () => ({
        url: `applications/`, // Replace with the appropriate API endpoint
        method: "GET",
      }),
    }),
    getApplicant: builder.query<ApplicantsSubmission, { id: string }>({
      query: ({ id }) => ({
        url: `applications/${id}`, // Replace with the appropriate API endpoint
        method: "GET",
      }),
    }),
  }),
});

export const {} = applicantApi;
