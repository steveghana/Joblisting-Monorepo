import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import _api_url from "../../api/_api_url";
import { ApplicantsSubmission, IRoleData } from "../../types/roles";

export const ROLE_API_KEY = "RoleApi";

export const roleApi = createApi({
  reducerPath: "RoleApi",
  baseQuery: fetchBaseQuery({ baseUrl: _api_url.getApiUrl() }), // Replace with your actual API URL
  endpoints: (builder) => ({
    updateRole: builder.mutation<IRoleData, { id: string; data: IRoleData }>({
      query: ({ data, id }) => ({
        url: `role/${id}`, // Replace with the appropriate API endpoint
        method: "UPDATE",
        body: data,
      }),
    }),
    deletRole: builder.mutation<IRoleData, { id: string }>({
      query: ({ id }) => ({
        url: `role/delete${id}`, // Replace with the appropriate API endpoint
        method: "DELETE",
      }),
    }),

    addRole: builder.mutation<IRoleData, IRoleData>({
      query: (role) => ({
        url: "role/add", // Replace with the appropriate API endpoint
        method: "POST",
        body: role,
      }),
    }),
    getRole: builder.query<IRoleData, { id: string }>({
      query: ({ id }) => ({
        url: `role/get/${id}`, // Replace with the appropriate API endpoint
        method: "GET",
      }),
    }),
    getApplicants: builder.query<ApplicantsSubmission[], ApplicantsSubmission>({
      query: () => ({
        url: `role/applicants/get/`, // Replace with the appropriate API endpoint
        method: "GET",
      }),
    }),
    getApplicant: builder.query<ApplicantsSubmission, { id: string }>({
      query: ({ id }) => ({
        url: `role/applicants/get/${id}`, // Replace with the appropriate API endpoint
        method: "GET",
      }),
    }),
    getRoles: builder.query<IRoleData, void>({
      query: () => ({
        url: "role/get", // Replace with the appropriate API endpoint
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
