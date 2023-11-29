import { login } from "@/auth/authService";
import { useMutation } from "@tanstack/react-query";
import { useAuthActions } from "@/store";
import useGetUserInfo from "./useGetUserInfo";
import type { LoginPayload } from "@/types/auth";
import type { LoginResponse } from "@/types/response";
import type { AxiosError } from "axios";

export default function useLogin() {
  const { setAccessToken, setRefreshToken, setUserData, setPrivileges } = useAuthActions();
  const { refetch: fetchInfo } = useGetUserInfo({ enabled: false });

  return useMutation<LoginResponse, AxiosError<{ error: string }>, LoginPayload>({
    mutationFn: login,
    async onSuccess({ token: accessToken, refreshtoken: refreshToken, privilege }) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setPrivileges(privilege);

      const res = await fetchInfo();
      setUserData(res.data?.userInfo.user);
    },
  });
}
