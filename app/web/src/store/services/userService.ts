import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProfession } from "../../types/roles";
import axios from "axios";
import _api_url from "../../api/_api_url";

interface IUser {
  email: string;
  password: string;
}
interface IRegister extends IUser {
  firstName: string;
  lastName: string;
  role: IProfession;
}
const authToken = sessionStorage.getItem("authToken");

const axiosInstance = axios.create({
  baseURL: _api_url.getApiUrl(),
  headers: {
    Authorization: authToken ? authToken : "",
  },
});

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: _api_url.getApiUrl() }), // Replace with your actual API URL
  endpoints: (builder) => ({
    loginUser: builder.mutation<
      { role: string; authTokenId: string },
      IUser & { rememberMe: boolean }
    >({
      query: (user) => ({
        url: "user/login", // Replace with the appropriate API endpoint
        method: "POST",
        body: user,
      }),
    }),
    registerUser: builder.mutation<IRegister, IRegister>({
      query: (user) => ({
        url: "user/register", // Replace with the appropriate API endpoint
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = userApi;
