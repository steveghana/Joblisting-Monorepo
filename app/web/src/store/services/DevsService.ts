import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProfession } from "../../types/roles";
import axios from "axios";
import _api_url from "../../api/_api_url";
import { IDev } from "../../types/devs";
import { IClient } from "../../types/client";
export const DEV_API_KEY = "DevApi";
export const devApi = createApi({
  reducerPath: DEV_API_KEY,
  baseQuery: fetchBaseQuery({ baseUrl: _api_url.getApiUrl() }), // Replace with your actual API URL
  endpoints: (builder) => ({
    updateDev: builder.mutation<IDev, { id: string; data: Partial<IDev> }>({
      query: (body) => ({
        url: `developers/${body.id}`, // Replace with the appropriate API endpoint
        method: "PATCH",
        body,
      }),
    }),
    deletDev: builder.mutation<IDev, { id: string }>({
      query: ({ id }) => ({
        url: `developers/${id}`, // Replace with the appropriate API endpoint
        method: "DELETE",
      }),
    }),

    addDev: builder.mutation<IDev, IDev>({
      query: (dev) => ({
        url: "developers", // Replace with the appropriate API endpoint
        method: "POST",
        body: dev,
      }),
    }),
    getDevs: builder.query<IDev[], void>({
      query: () => ({
        url: "developers", // Replace with the appropriate API endpoint
        method: "GET",
      }),
      transformResponse: (response: IDev[], meta) => {
        return response;
      },
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: any, meta, arg) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return Array.isArray(message) ? message.join(",") : message;
      },
    }),
    getDev: builder.query<IDev, { id: string }>({
      query: ({ id }) => ({
        url: `developers/${id}`, // Replace with the appropriate API endpoint
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUpdateDevMutation,
  useAddDevMutation,
  useDeletDevMutation,
  useGetDevQuery,

  useGetDevsQuery,
} = devApi;
