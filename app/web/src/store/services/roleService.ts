import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import _api_url from "../../api/_api_url";
import { ApplicantsSubmission, IRoleData } from "../../types/roles";

export const ROLE_API_KEY = "RoleApi";

export const roleApi = createApi({
  reducerPath: ROLE_API_KEY,
  baseQuery: fetchBaseQuery({ baseUrl: _api_url.getApiUrl() }), // Replace with your actual API URL
  endpoints: (builder) => ({
    updateRole: builder.mutation<IRoleData, { id: string; data: IRoleData }>({
      query: ({ data, id }) => ({
        url: `roles/${id}`, // Replace with the appropriate API endpoint
        method: "UPDATE",
        body: data,
      }),
    }),
    deletRole: builder.mutation<IRoleData, { id: string }>({
      query: ({ id }) => ({
        url: `roles/${id}`, // Replace with the appropriate API endpoint
        method: "DELETE",
      }),
    }),

    addRole: builder.mutation<IRoleData, IRoleData>({
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
  useAddRoleMutation,
  useDeletRoleMutation,
  useGetRoleQuery,
  useGetRolesQuery,
} = roleApi;
