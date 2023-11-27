import apiClient from "@/api/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthActions } from "@/store";
import type { AxiosError } from "axios";
import type { Staff, User } from "@/types/user";
import type { ProfileUpdateResponse, UserUpdateResponse } from "@/types/response";

export default function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  const { setUserData } = useAuthActions();

  return useMutation<
    { staff: Staff; user: Omit<User, "staff"> },
    AxiosError,
    {
      id: number;
      userPayload: {
        username: string;
        password: string;
        newPassword: string;
      };
      staffPayload: {
        name: string;
        phone: string;
        address: string;
        image: File;
      };
    }
  >({
    async mutationFn({ id, userPayload, staffPayload }) {
      const userData = {
        ...userPayload,
        password: userPayload.password === "" ? undefined : userPayload.password,
        newPassword: userPayload.newPassword === "" ? undefined : userPayload.newPassword,
      };

      const staffFormData = new FormData();
      staffFormData.append("name", staffPayload.name);
      staffFormData.append("phone", staffPayload.phone);
      staffFormData.append("address", staffPayload.address);
      if (staffPayload.image) staffFormData.append("image", staffPayload.image);

      const updateStaff = apiClient.put<ProfileUpdateResponse>(`staff/${id}`, staffFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const updateUser = apiClient.put<UserUpdateResponse>(`auth/${id}`, userData);

      const [staffResponse, userResponse] = await Promise.all([updateStaff, updateUser]);
      return { staff: staffResponse.data.staff, user: userResponse.data.user };
    },
    onSuccess(data) {
      const { staff, user } = data;
      setUserData({ ...user, staff });
      queryClient.invalidateQueries({ queryKey: ["user-info"] });
    },
  });
}
