import apiClient from "@/api/apiClient";
import { useStore } from "@/store";
import type { LoginPayload, LogoutPayload } from "@/types/auth";
import type {
  BaseResponse,
  LoginResponse,
  MyProfileResponse,
  RefreshResponse,
} from "@/types/response";

export const login = async (payload: LoginPayload) => {
  const res = await apiClient.post<LoginResponse>("auth/login", payload);
  return res.data;
};

export const logout = async (payload: LogoutPayload) => {
  const res = await apiClient.delete<BaseResponse>("auth/logout", {
    data: { refreshToken: payload.refreshToken },
  });
  return res.data;
};

export const getProfileInfo = async () => {
  const res = await apiClient.get<MyProfileResponse>("auth/me");
  return res.data;
};

export const refreshAccessToken = async () => {
  const refreshToken = useStore.getState().refreshToken;
  const res = await apiClient.post<RefreshResponse>("auth/token", {
    refreshToken,
  });
  return res.data;
};

export const updateLocalAccessToken = (accessToken: string) => {
  useStore.setState({ accessToken });
};

export const updateLocalRefreshToken = (refreshToken: string) => {
  useStore.setState({ refreshToken });
};
