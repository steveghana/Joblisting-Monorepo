import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProfession, IRoleData } from "../../types/roles";
import axios from "axios";
import _api_url from "../../api/_api_url";
import { TokenResponse } from "@react-oauth/google";

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

export const USER_API_KEY = "userApi";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: _api_url.getApiUrl(),
    headers: {
      Authorization: authToken ? authToken : "",
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<IResponseLg, IUser & { rememberMe: boolean }>({
      query: (user) => ({
        url: "user/login",
        method: "POST",
        body: user,
      }),
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
    loginUserWithGoogle: builder.mutation<IResponseLg, { accessToken: string }>(
      {
        query: ({ accessToken }) => ({
          url: "user/login/google",
          method: "POST",
          body: { accessToken },
        }),
        transformErrorResponse: (response: any, meta, arg) => {
          const {
            data: {
              error: { message },
            },
          } = response;
          return Array.isArray(message) ? message.join(",") : message;
        },
        // providesTags: (result, error, id) => [{ type: "Post", id }],
      }
    ),
    // getAccessToken: builder.query<AuthResponse, string>({
    //   query: (code) => {
    //     return {
    //       url: "github/access_token",
    //       method: "POST",
    //       body: { code },
    //     };
    //   },
    // }),
    registerUser: builder.mutation<IResponseRg, IRegister>({
      query: (user) => ({
        url: "user/register",
        method: "POST",
        body: user,
      }),
      transformResponse: (response: IResponseRg, meta, arg) => {
        // Dispatch data to Redux store upon successful query
        // const dispatch = useTypedDispatch();
        // dispatch();

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
    getUser: builder.query<IUser, { id: string }>({
      query: ({ id }) => ({
        url: `user/${id}`,
        method: "GET",
      }),
      transformResponse: (response: IUser, meta, arg) => {
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
  }),
});

export const {
  useLoginUserMutation,
  useLoginUserWithGoogleMutation,
  useRegisterUserMutation,
  useGetUserQuery,
} = userApi;
