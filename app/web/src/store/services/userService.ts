import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProfession } from "../../types/roles";
import axios, { AxiosRequestConfig } from "axios";
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
const baseQuery = async (config: AxiosRequestConfig) => {
  try {
    const response = await axiosInstance(config);
    return { data: response.data };
  } catch (error) {
    // You can handle errors here or propagate them to the caller
    throw error;
  }
};
export const userApi = createApi({
  baseQuery,
  reducerPath: "userApi",

  // ... other configuration for your service
  endpoints: (builder) => ({
    registerUser: builder.mutation<
      { authTokenId: string; role: string },
      IRegister
    >({
      query: (user) => ({
        url: "user/register",
        method: "POST",
        data: user,
      }),
    }),
    loginUser: builder.mutation<any, IUser & { rememberMe: boolean }>({
      query: ({ email, password, rememberMe }) => ({
        url: "user/login",
        method: "POST",
        data: { email, password, rememberMe },
      }),
    }),
    // Define other endpoints as needed
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = userApi;
