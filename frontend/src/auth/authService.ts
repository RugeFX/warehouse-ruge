import apiClient from "@/api/apiClient";
import type { LoginPayload, LogoutPayload } from "@/types/auth";
import type { BaseResponse, LoginResponse, RefreshResponse } from "@/types/response";
import type { PersistedInfo } from "@/types/user";

const getPersistedInfo = () => {
  return JSON.parse(localStorage.getItem("user-info")!) as PersistedInfo;
};

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

export const refreshAccessToken = async () => {
  const userInfo = getLocalUserInfo();
  const res = await apiClient.post<RefreshResponse>("auth/token", {
    refreshToken: userInfo?.refreshToken,
  });
  return res.data;
};

export const getLocalUserInfo = () => {
  return getPersistedInfo().state;
};

export const updateLocalAccessToken = (accessToken: string) => {
  const currentInfo = getPersistedInfo();
  localStorage.setItem(
    "user-info",
    JSON.stringify({ ...currentInfo, state: { ...currentInfo.state, accessToken } })
  );
};

export const updateLocalRefreshToken = (refreshToken: string) => {
  const currentInfo = getPersistedInfo();
  localStorage.setItem(
    "user-info",
    JSON.stringify({ ...currentInfo, state: { ...currentInfo.state, refreshToken } })
  );
};
