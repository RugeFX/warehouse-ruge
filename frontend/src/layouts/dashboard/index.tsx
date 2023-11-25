import { Toaster } from "@/components/ui/toaster";
import MainNav from "./components/MainNav";
import SidebarNav from "./components/SidebarNav";
import UserNav from "./components/UserNav";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <>
      <div className="flex">
        <SidebarNav />
        <div className="flex-1">
          <div className="flex-col md:flex">
            <div className="border-b">
              <div className="flex h-16 items-center px-4">
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
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
