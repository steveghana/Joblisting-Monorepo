import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import _api_url from "../../api/_api_url";
import { ApplicantsSubmission, IRoleData } from "../../types/roles";
import { ClientFormDataState } from "../../types/client";

export const ROLE_API_KEY = "RoleApi";

export const roleApi = createApi({
  reducerPath: ROLE_API_KEY,
  baseQuery: fetchBaseQuery({ baseUrl: _api_url.getApiUrl() }), // Replace with your actual API URL
  endpoints: (builder) => ({
    updateRole: builder.mutation<IRoleData, Partial<IRoleData>>({
      query: ({ id, ...rest }) => ({
        url: `roles/${id}`, // Replace with the appropriate API endpoint
        method: "PATCH",
        body: rest,
      }),
    }),
    deletRole: builder.mutation<IRoleData, { id: string }>({
      query: ({ id }) => ({
        url: `roles/${id}`, // Replace with the appropriate API endpoint
        method: "DELETE",
      }),
    }),
    bulkDeletRole: builder.mutation<IRoleData, { id: string[] }>({
      query: ({ id }) => ({
        url: `roles`, // Replace with the appropriate API endpoint
        method: "DELETE",
        body: id,
      }),
    }),

    addRole: builder.mutation<
      IRoleData,
      ClientFormDataState["Project Details"]
    >({
      query: (role) => ({
        url: "roles", // Replace with the appropriate API endpoint
        method: "POST",
        body: role,
      }),
    }),
    getRole: builder.query<IRoleData, { id: string }>({
      query: ({ id }) => ({
        url: `roles/${id}`, // Replace with the appropriate API endpoint
        method: "GET",
      }),
    }),
    addApplicants: builder.query<ApplicantsSubmission, ApplicantsSubmission>({
      query: () => ({
        url: `role/applicants/`, // Replace with the appropriate API endpoint
        method: "POST",
      }),
    }),
    deleteApplicant: builder.query<ApplicantsSubmission, { id: string }>({
      query: ({ id }) => ({
        url: `role/applicants/:${id}`, // Replace with the appropriate API endpoint
        method: "POST",
      }),
    }),
    getApplicants: builder.query<ApplicantsSubmission[], ApplicantsSubmission>({
      query: () => ({
        url: `role/applicants/`, // Replace with the appropriate API endpoint
        method: "GET",
      }),
    }),
    getApplicant: builder.query<ApplicantsSubmission, { id: string }>({
      query: ({ id }) => ({
        url: `role/applicants/${id}`, // Replace with the appropriate API endpoint
        method: "GET",
      }),
    }),
    getRoles: builder.query<IRoleData[], void>({
      query: () => ({
        url: "roles", // Replace with the appropriate API endpoint
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUpdateRoleMutation,
  useBulkDeletRoleMutation,
  useAddRoleMutation,
  useDeletRoleMutation,
  useGetRoleQuery,
  useGetRolesQuery,
} = roleApi;
