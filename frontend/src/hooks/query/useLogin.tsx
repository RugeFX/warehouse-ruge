import { login } from "@/auth/authService";
import { useMutation } from "@tanstack/react-query";
import type { LoginPayload } from "@/types/auth";
import type { LoginResponse } from "@/types/response";
import type { AxiosError } from "axios";
import { useAuthActions } from "@/store";

export default function useLogin() {
  const { setAccessToken, setRefreshToken } = useAuthActions();

  return useMutation<LoginResponse, AxiosError<{ error: string }>, LoginPayload>({
    mutationFn: login,
    onSuccess({ token: accessToken, refreshtoken: refreshToken }) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    },
  });
}
