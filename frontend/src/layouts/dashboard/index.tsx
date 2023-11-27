import { Toaster } from "@/components/ui/toaster";
import MainNav from "./components/MainNav";
import SidebarNav from "./components/SidebarNav";
import UserNav from "./components/UserNav";
import { Outlet, useLoaderData } from "react-router-dom";
import { getPrivileges } from "@/auth/authService";
import type { PrivilegeResponse } from "@/types/response";
import type { FetchQueryOptions, QueryClient } from "@tanstack/react-query";
import loaderRequireAuth from "@/auth/loaderRequireAuth";

export const privilegesQuery: FetchQueryOptions<PrivilegeResponse> = {
  queryKey: ["user-privileges"],
  queryFn: async () => getPrivileges(),
};

export const loader = (queryClient: QueryClient) => async () => {
  await loaderRequireAuth();

  return (
    queryClient.getQueryData<PrivilegeResponse>(privilegesQuery.queryKey) ??
    (await queryClient.fetchQuery(privilegesQuery))
  );
};

export default function DashboardLayout() {
  const { privileges } = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>;

  return (
    <>
      <div className="flex">
        <SidebarNav privileges={privileges} />
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
