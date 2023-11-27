import ProfileUpdateForm from "./components/ProfileUpdateForm";
import { getProfileInfo } from "@/auth/authService";
import type { FetchQueryOptions, QueryClient } from "@tanstack/react-query";
import type { MyProfileResponse } from "@/types/response";
import { useLoaderData } from "react-router-dom";
import loaderRequireAuth from "@/auth/loaderRequireAuth";

export const userInfoQuery: FetchQueryOptions<MyProfileResponse> = {
  queryKey: ["user-info"],
  queryFn: async () => getProfileInfo(),
};

export const loader = (queryClient: QueryClient) => async () => {
  await loaderRequireAuth();

  return (
    queryClient.getQueryData<MyProfileResponse>(userInfoQuery.queryKey) ??
    (await queryClient.fetchQuery(userInfoQuery))
  );
};

export default function ProfilePage() {
  const userData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>;

  return (
    <main className="space-y-4 p-8 pt-6">
      <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
      <ProfileUpdateForm userData={userData.userInfo} />
    </main>
  );
}
