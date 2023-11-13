import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL ?? "http://localhost:5000",
  withCredentials: true,
});

apiClient.defaults.headers.common["Content-Type"] = "application/json";

export default apiClient;
