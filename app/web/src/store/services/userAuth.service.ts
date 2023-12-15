import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProfession, IRoleData } from "../../types/roles";
import axios from "axios";
import _api_url from "../../api/_api_url";
import { TokenResponse } from "@react-oauth/google";

interface IUser {
  role?: IProfession;
  email: string;
  password: string;
}
interface IRegister {
  user: {
    firstName: string;
    lastName: string;
    role?: IProfession;
    phoneNumber: string;
  } & IUser;
}
type IResponseRg = {
  token: string;
  email: string;
  password: string;
};
type IResponseLg = { role: string; authTokenId: string };

export const USER_API_KEY = "userApi";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: _api_url.getApiUrl(),
    prepareHeaders: (headers, { getState }) => {
      const authToken = sessionStorage.getItem("auth_token");
      if (authToken) {
        headers.set("Authorization", authToken);
      }
      return headers;
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
    loginUserWithGoogle: builder.mutation<
      IResponseLg,
      { accessToken: string; role?: IProfession }
    >({
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
    }),
    registerUserWithGoogle: builder.mutation<
      IResponseRg,
      { accessToken: string }
    >({
      query: ({ accessToken }) => ({
        url: "user/register/google",
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
    }),
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
    updateUser: builder.mutation<number, { role: IProfession }>({
      query: (user) => ({
        url: "user/update",
        method: "PATCH",
        body: { ...user },
      }),
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
      transformErrorResponse: (response: any, meta, arg) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return Array.isArray(message) ? message.join(",") : message;
      },
    }),
    getRoles: builder.query<IProfession[], void>({
      query: () => ({
        url: `user`,
        method: "GET",
      }),
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
  useGetRolesQuery,
  useRegisterUserWithGoogleMutation,
  useRegisterUserMutation,
  useUpdateUserMutation,
  useGetUserQuery,
} = userApi;
