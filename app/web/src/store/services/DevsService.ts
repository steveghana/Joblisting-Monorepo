import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProfession } from "../../types/roles";
import axios from "axios";
import _api_url from "../../api/_api_url";
import { IDev } from "../../types/devs";
export const DEV_API_KEY = "DevApi";
export const devApi = createApi({
  reducerPath: DEV_API_KEY,
  baseQuery: fetchBaseQuery({ baseUrl: _api_url.getApiUrl() }), // Replace with your actual API URL
  endpoints: (builder) => ({
    updateDev: builder.mutation<IDev, { id: string; data: IDev }>({
      query: ({ data, id }) => ({
        url: `dev/${id}`, // Replace with the appropriate API endpoint
        method: "UPDATE",
        body: data,
      }),
    }),
    deletDev: builder.mutation<IDev, { id: string }>({
      query: ({ id }) => ({
        url: `dev/delete${id}`, // Replace with the appropriate API endpoint
        method: "DELETE",
      }),
    }),

    addDev: builder.mutation<IDev, IDev>({
      query: (dev) => ({
        url: "Dev/add", // Replace with the appropriate API endpoint
        method: "POST",
        body: dev,
      }),
    }),
    getDevs: builder.query<string, void>({
      query: () => ({
        url: "developers", // Replace with the appropriate API endpoint
        // method: "GET",
        responseHandler: (response: { text: () => any }) => response.text(),
      }),
      transformResponse: (response, meta) => {
        const parsedData = JSON.parse(response as string);
        console.log(parsedData);
        return parsedData;
      },
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg
      ) => response.status,
    }),
    getDev: builder.query<IDev, { id: string }>({
      query: ({ id }) => ({
        url: `dev/get/${id}`, // Replace with the appropriate API endpoint
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
