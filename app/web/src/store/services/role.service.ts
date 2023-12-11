import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import _api_url from "../../api/_api_url";
import { ApplicantsSubmission, IRoleData } from "../../types/roles";
import { ClientFormDataState } from "../../types/client";

export const ROLE_API_KEY = "RoleApi";
const authToken = sessionStorage.getItem("authToken");

export const roleApi = createApi({
  reducerPath: ROLE_API_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: _api_url.getApiUrl(),
    headers: {
      Authorization: authToken ? authToken : "",
    },
  }),
  tagTypes: [ROLE_API_KEY],

  endpoints: (builder) => ({
    updateRole: builder.mutation<IRoleData, Partial<IRoleData>>({
      query: ({ id, ...rest }) => ({
        url: `roles/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: [ROLE_API_KEY],
    }),
    deletRole: builder.mutation<IRoleData, { id: string }>({
      query: ({ id }) => ({
        url: `roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [ROLE_API_KEY],
    }),
    bulkDeletRole: builder.mutation<IRoleData, { id: string[] }>({
      query: ({ id }) => ({
        url: `roles`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: [ROLE_API_KEY],
    }),

    addRole: builder.mutation<
      IRoleData,
      ClientFormDataState["Project Details"] & { clientId: string }
    >({
      query: (role) => ({
        url: `roles/${role.clientId}`,
        method: "POST",
        body: role,
      }),
      invalidatesTags: [ROLE_API_KEY],
    }),
    addJob: builder.mutation<
      IRoleData,
      ClientFormDataState["Role Info"] & { roleId: string }
    >({
      query: (role) => ({
        url: `roles/job/${role.roleId}`,
        method: "POST",
        body: role,
      }),
      invalidatesTags: [ROLE_API_KEY],
    }),
    getRole: builder.query<IRoleData, { id: string }>({
      query: ({ id }) => ({
        url: `roles/${id}`,
        method: "GET",
      }),
      providesTags: [ROLE_API_KEY],
    }),

    getRoles: builder.query<IRoleData[], void>({
      query: () => ({
        url: "roles",
        method: "GET",
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "RoleApi" as const, id })),
              ROLE_API_KEY,
            ]
          : [ROLE_API_KEY],
    }),
  }),
});

export const {
  useUpdateRoleMutation,
  useBulkDeletRoleMutation,
  useAddRoleMutation,
  useAddJobMutation,
  useDeletRoleMutation,
  useGetRoleQuery,
  useGetRolesQuery,
} = roleApi;