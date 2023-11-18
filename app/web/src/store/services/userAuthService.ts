import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProfession, IRoleData } from "../../types/roles";
import axios from "axios";
import _api_url from "../../api/_api_url";
import { useTypedDispatch } from "..";

interface IUser {
  email: string;
  password: string;
}
interface IRegister {
  user: {
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
export const USER_API_KEY = "userApi";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: _api_url.getApiUrl() }), // Replace with your actual API URL
  endpoints: (builder) => ({
    loginUser: builder.mutation<IResponse, IUser & { rememberMe: boolean }>({
      query: (user) => ({
        url: "user/login", // Replace with the appropriate API endpoint
        method: "POST",
        body: user,
      }),
      transformResponse: (response: IResponse, meta, arg) => {
        // Dispatch data to Redux store upon successful query
        // const dispatch = useTypedDispatch();
        // dispatch();

        return response;
      },
      // Pick out errors and prevent nested properties in a hook or selector

      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response, meta, arg) => response.data,
      // providesTags: (result, error, id) => [{ type: "Post", id }],
    }),

    registerUser: builder.mutation<IResponse, IRegister>({
      query: (user) => ({
        url: "user/register", // Replace with the appropriate API endpoint
        method: "POST",
        body: user,
      }),
      transformResponse: (response: { data: IResponse }, meta, arg) => {
        // Dispatch data to Redux store upon successful query
        // const dispatch = useTypedDispatch();
        // dispatch();

        return response.data;
      },
      // Pick out errors and prevent nested properties in a hook or selector

      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    getUser: builder.query<IResponse, { id: string }>({
      query: ({ id }) => ({
        url: `user/${id}`, // Replace with the appropriate API endpoint
        method: "GET",
      }),
      transformResponse: (response: { data: IResponse }, meta, arg) => {
        // Dispatch data to Redux store upon successful query
        // const dispatch = useTypedDispatch();
        // dispatch();

        return response.data;
      },
      // Pick out errors and prevent nested properties in a hook or selector

      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserQuery,
} = userApi;
