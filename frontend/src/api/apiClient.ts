import axios from "axios";
import type { RefreshResponse } from "@/types/response";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL ?? "http://localhost:5000",
  withCredentials: true,
});

apiClient.defaults.headers.common["Content-Type"] = "application/json";

export const refreshAccessToken = async () => {
  const response = await apiClient.post<RefreshResponse>("auth/token");
  return response.data;
};
