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
    phoneNumber: string;
  } & IUser;
}
const authToken = sessionStorage.getItem("authToken");
type IResponseRg = { role: string; token: string };
type IResponseLg = { role: string; authTokenId: string };
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
    loginUser: builder.mutation<IResponseLg, IUser & { rememberMe: boolean }>({
      query: (user) => ({
        url: "user/login", // Replace with the appropriate API endpoint
        method: "POST",
        body: user,
      }),
      transformResponse: (response: IResponseLg, meta, arg) => {
        // Dispatch data to Redux store upon successful query
        // const dispatch = useTypedDispatch();
        // dispatch();

        return response;
      },
      // Pick out errors and prevent nested properties in a hook or selector

      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: any, meta, arg) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return Array.isArray(message) ? message.join(",") : message;
      },
      // providesTags: (result, error, id) => [{ type: "Post", id }],
    }),

    registerUser: builder.mutation<IResponseRg, IRegister>({
      query: (user) => ({
        url: "user/register", // Replace with the appropriate API endpoint
        method: "POST",
        body: user,
      }),
      transformResponse: (response: IResponseRg, meta, arg) => {
        // Dispatch data to Redux store upon successful query
        // const dispatch = useTypedDispatch();
        // dispatch();
        console.log(response, "from regstiening");

        return response;
      },
      // Pick out errors and prevent nested properties in a hook or selector

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
    getUser: builder.query<IUser, { id: string }>({
      query: ({ id }) => ({
        url: `user/${id}`, // Replace with the appropriate API endpoint
        method: "GET",
      }),
      transformResponse: (response: IUser, meta, arg) => {
        // Dispatch data to Redux store upon successful query
        // const dispatch = useTypedDispatch();
        // dispatch();

        return response;
      },
      // Pick out errors and prevent nested properties in a hook or selector

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
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserQuery,
} = userApi;
