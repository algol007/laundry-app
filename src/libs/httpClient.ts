import Axios, { AxiosHeaders, AxiosResponse } from "axios";
import { tokenStorage } from "./tokenStorage";

export const httpClient = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export function setAxiosToken(token: string) {
  httpClient.defaults.headers["token"] = token;
}

export function removeAxiosToken() {
  delete httpClient.defaults.headers["token"];
}

export function getDefaultHeaders() {
  return {
    token: `Bearer ${tokenStorage.get()}`,
  };
}

httpClient.interceptors.request.use((config: any) => {
  const token = tokenStorage.get();

  if (!config.headers || !token) return config;

  if (config.headers instanceof AxiosHeaders) {
    config.headers.set("token", token);
  } else if (config.headers !== undefined) {
    config.headers["token"] = token;
  }

  return config;
});

httpClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Only return response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error)
    if (error === 401) {
      localStorage.clear();
      location.href = '/login';
    }
    return Promise.reject(error);
  }
);
