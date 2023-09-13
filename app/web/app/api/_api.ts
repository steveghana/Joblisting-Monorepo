import axios, { AxiosRequestConfig, Method, AxiosResponse } from "axios";
import apiUrl from "./_api_url";

type Options = {
  headers?: Record<string, any>;
};

type ApiCallResponse = AxiosResponse;

function apiCall(
  method: Method,
  route: string,
  data = {},
  options: Options = {}
): Promise<ApiCallResponse> {
  const authToken = sessionStorage.getItem("authToken");
  const axiosConfig: AxiosRequestConfig = {
    method,
    url: `${apiUrl.getApiUrl()}/${route}`,
    headers: {
      ...options.headers,
      Authorization: authToken ? authToken : "",
    },
    params: method === "get" ? data : undefined,
    data: method !== "get" ? data : undefined,
  };

  return axios(axiosConfig)
    .then((response) => response)
    .catch((error) => {
      handleApiError(error);
      return Promise.reject(error);
    });
}

function handleApiError(error: any) {
  if (error.response) {
    const { status, data } = error.response;
    if (status === 403 && (data === "not found" || data === "inactive")) {
      const authToken = sessionStorage.getItem("authToken");
      if (authToken === sessionStorage.getItem("authToken")) {
        sessionStorage.removeItem("authToken");
      }
    }
  }
}
const registerUser = (user: {
  email: string;
  password: string;
  fullName: string;
}) /* : Promise<IUser>  */ => {
  console.log(user);
  //   return apiCall("post", "user/register", { user }).then(
  //     (response) => response.data as IUser
  //   );
};

type LoggedInUser = {
  authTokenId: string;
  credentialTokenUuid?: string;
};

const loginUser = (
  email: string,
  password: string,
  rememberMe: boolean
): Promise<LoggedInUser> => {
  return apiCall("post", "user/login", { email, password, rememberMe }).then(
    (response) => response.data as LoggedInUser
  );
};

const loginWithCredentialToken = (
  credentialTokenUuid: string
): Promise<LoggedInUser> => {
  return apiCall("post", "user/login/credentialToken", {
    credentialTokenUuid,
  }).then((response) => response.data as LoggedInUser);
};

const logoutUser = (): Promise<void> => {
  const credentialToken = localStorage.getItem("credentialToken");
  return apiCall("post", "user/logout", { credentialToken }).then(() => {});
};

export default {
  user: {
    register: registerUser,
    login: loginUser,
    loginWithCredentialToken: loginWithCredentialToken,
    logout: logoutUser,
  },
};
