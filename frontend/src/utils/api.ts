import axios, { InternalAxiosRequestConfig } from "axios";
import { authApi } from "../services";

const backend = axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_API_PORT}/api/v1/`,
  timeout: 5000,
  headers: {
    Accept: "application/json",
  },
});

backend.interceptors.request.use((config): Promise<InternalAxiosRequestConfig> => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const userId = localStorage.getItem("userId");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers.set("RefreshToken", refreshToken);
    config.headers.set("userId", userId);
  }
  return Promise.resolve(config);
});

backend.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401) {
      // unauthorize
      const newToken = await getNewToken();
      localStorage.setItem("accessToken", newToken.accessToken);
      localStorage.setItem("refreshToken", newToken.refreshToken);
      originalRequest.headers.Authorization = `Bearer ${newToken.accessToken}`;
      return backend(originalRequest);
    } else {
      return Promise.reject(error);
    }
  }
);

const getNewToken = async () => {
  try {
    const response = await authApi.refreshToken();
    return response.data;
  } catch (e) {
    console.error(e);
    await authApi.logout();
  }
};

export default backend;
