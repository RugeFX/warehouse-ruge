import axios, { type InternalAxiosRequestConfig, type AxiosError } from "axios";
import { getLocalUserInfo, refreshAccessToken, updateLocalAccessToken } from "@/auth/authService";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL ?? "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getLocalUserInfo()?.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const config = err.config as InternalAxiosRequestConfig<unknown> & { _retry?: boolean };

    if (config.url !== "/auth/login" && err.response) {
      if (err.response.status === 401 && !config._retry) {
        config._retry = true;

        try {
          const { token } = await refreshAccessToken();
          updateLocalAccessToken(token);

          return apiClient(config);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default apiClient;
