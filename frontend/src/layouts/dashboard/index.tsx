import { Toaster } from "@/components/ui/toaster";
import MainNav from "./components/MainNav";
import SidebarNav from "./components/SidebarNav";
import UserNav from "./components/UserNav";
import { Outlet, useLoaderData } from "react-router-dom";
import { getProfileInfo } from "@/auth/authService";
import type { MyProfileResponse } from "@/types/response";
import type { FetchQueryOptions, QueryClient } from "@tanstack/react-query";
import loaderRequireAuth from "@/auth/loaderRequireAuth";

export const privilegesQuery: FetchQueryOptions<MyProfileResponse["userInfo"]> = {
  queryKey: ["user-info", "privileges"],
  queryFn: async () => {
    return (await getProfileInfo()).userInfo;
  },
};

export const loader = (queryClient: QueryClient) => async () => {
  await loaderRequireAuth();

  return (
    queryClient.getQueryData<MyProfileResponse["userInfo"]>(privilegesQuery.queryKey) ??
    (await queryClient.fetchQuery(privilegesQuery))
  );
};

export default function DashboardLayout() {
  const { privilege } = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>;

  return (
    <>
      <div className="flex">
        <SidebarNav privileges={privilege} />
        <div className="flex-1">
          <div className="flex-col md:flex">
            <div className="border-b">
              <div className="flex h-16 items-center justify-end px-4">
                <MainNav className="mx-6" />
                <div className="flex items-center space-x-4">
                  <UserNav />
                </div>
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
