import { logout } from "@/auth/authService";
import { useMutation } from "@tanstack/react-query";
import { useAuthActions } from "@/store";
import type { LogoutPayload } from "@/types/auth";
import type { AxiosError } from "axios";
import type { BaseResponse } from "@/types/response";

export default function useLogout() {
  const { clearUserInfo } = useAuthActions();

  return useMutation<
    BaseResponse,
    AxiosError<{ error: string } | { message: string }>,
    LogoutPayload
  >({
    mutationFn: logout,
    onSuccess() {
      clearUserInfo();
    },
  });
}
