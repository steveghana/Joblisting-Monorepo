import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProfession } from "../../types/roles";
import axios from "axios";
import _api_url from "../../api/_api_url";
import { Iinterviews, InterviewAdd } from "../../types/interviews";

interface IUser {
  email: string;
  password: string;
}
interface IRegister {
  Interview: {
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
export const INTERVEW_API_KEY = "interviewApi";
export const interviewApi = createApi({
  reducerPath: INTERVEW_API_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: _api_url.getApiUrl(),
    headers: {
      Authorization: authToken ? authToken : "",
    },
  }),
  tagTypes: ["interviews"],

  endpoints: (builder) => ({
    updateInterview: builder.mutation<
      number,
      { id: string; data: Omit<InterviewAdd, "candidate" | "interviewer"> }
    >({
      query: ({ data, id }) => ({
        url: `interviews/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["interviews"],
    }),
    deletInterview: builder.mutation<number, { id: string }>({
      query: ({ id }) => ({
        url: `interviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["interviews"],
    }),

    addInterview: builder.mutation<
      Iinterviews,
      Omit<InterviewAdd, "candidate" | "interviewer">
    >({
      query: (Interview) => ({
        url: "interviews",
        method: "POST",
        body: Interview,
      }),
      invalidatesTags: ["interviews"],

      transformResponse: (response: Iinterviews, meta) => {
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
    getInterview: builder.query<Iinterviews, { id: string }>({
      query: ({ id }) => ({
        url: `interviews/${id}`,
        method: "GET",
      }),
      providesTags: ["interviews"],
    }),
    getInterviews: builder.query<Iinterviews[], void>({
      query: () => ({
        url: "interviews",
        method: "GET",
      }),
      providesTags: (result, error) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "interviews" as const, id })),
              "interviews",
            ]
          : ["interviews"],
      transformResponse: (response: Iinterviews[], meta) => {
        console.log(response, "response from query");
        return response;
      },
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
  useUpdateInterviewMutation,
  useAddInterviewMutation,
  useDeletInterviewMutation,
  useGetInterviewsQuery,
  useGetInterviewQuery,
} = interviewApi;
