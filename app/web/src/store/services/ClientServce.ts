import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProfession } from "../../types/roles";
import axios from "axios";
import _api_url from "../../api/_api_url";
import { ClientFormDataState, IClient } from "../../types/client";

interface IUser {
  email: string;
  password: string;
}
interface IRegister {
  client: {
    firstName: string;
    lastName: string;
    role: IProfession;
  } & IUser;
}
const authToken = sessionStorage.getItem("authToken");
type IResponse = { role: string; authTokenId: string };
const axiosInstance = axios.create({
  baseURL: _api_url.getApiUrl(),
  headers: {
    Authorization: authToken ? authToken : "",
  },
});
export const CLIENT_API_KEY = "clientApi";
export const clientApi = createApi({
  reducerPath: CLIENT_API_KEY,
  baseQuery: fetchBaseQuery({ baseUrl: _api_url.getApiUrl() }), // Replace with your actual API URL
  endpoints: (builder) => ({
    updateClient: builder.mutation<IClient, { id: string; data: IClient }>({
      query: ({ data, id }) => ({
        url: `client/${id}`, // Replace with the appropriate API endpoint
        method: "UPDATE",
        body: data,
      }),
    }),
    deletClient: builder.mutation<IClient, { id: string }>({
      query: ({ id }) => ({
        url: `client/delete${id}`, // Replace with the appropriate API endpoint
        method: "DELETE",
      }),
    }),

    addClient: builder.mutation<IClient, ClientFormDataState>({
      query: (client) => ({
        url: "client", // Replace with the appropriate API endpoint
        method: "POST",
        body: client,
      }),
      transformResponse: (response, meta) => {
        const parsedData = JSON.parse(response as string);
        console.log(parsedData);
        return parsedData;
      },
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    getClient: builder.query<IClient, { id: string }>({
      query: ({ id }) => ({
        url: `client/get/${id}`, // Replace with the appropriate API endpoint
        method: "GET",
      }),
    }),
    getClients: builder.query<IClient[], void>({
      query: () => ({
        url: "client/get", // Replace with the appropriate API endpoint
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUpdateClientMutation,
  useAddClientMutation,
  useDeletClientMutation,
  useGetClientsQuery,
} = clientApi;
