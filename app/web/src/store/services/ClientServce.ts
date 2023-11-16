import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProfession } from "../../types/roles";
import axios from "axios";
import _api_url from "../../api/_api_url";
import { IClient } from "../../types/client";

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

export const clientApi = createApi({
  reducerPath: "clientApi",
  baseQuery: fetchBaseQuery({ baseUrl: _api_url.getApiUrl() }), // Replace with your actual API URL
  endpoints: (builder) => ({
    updateClient: builder.mutation<IResponse, { id: string; data: IClient }>({
      query: ({ data, id }) => ({
        url: `client/${id}`, // Replace with the appropriate API endpoint
        method: "UPDATE",
        body: data,
      }),
    }),
    deletClient: builder.mutation<IResponse, { id: string }>({
      query: ({ id }) => ({
        url: `client/delete${id}`, // Replace with the appropriate API endpoint
        method: "DELETE",
      }),
    }),

    addClient: builder.mutation<IResponse, IRegister>({
      query: (client) => ({
        url: "client/add", // Replace with the appropriate API endpoint
        method: "POST",
        body: client,
      }),
    }),
    getClient: builder.query<IResponse, IRegister>({
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
  useGetClientQuery,
} = clientApi;