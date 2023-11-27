import { type RouteObject, createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";
import NotFoundPage from "@/pages/NotFoundPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/login";
import ProfilePage, { loader as profileLoader } from "@/pages/profile";
import DashboardPage from "@/pages/dashboard";
import AccessTestPage from "@/pages/AccessTestPage";
import InventoryPage from "@/pages/inventory";
import AdminPage from "@/pages/admin";
import DashboardLayout, { loader as dashboardLoader } from "@/layouts/dashboard";
import type { QueryClient } from "@tanstack/react-query";

const privateRoutes = (queryClient: QueryClient): RouteObject => ({
  element: <PrivateRoute />,
  children: [
    {
      element: <DashboardLayout />,
      loader: dashboardLoader(queryClient),
      children: [
        {
          path: "dashboard",
          element: <DashboardPage />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
          loader: profileLoader(queryClient),
        },
        {
          path: "inventory",
          element: <InventoryPage />,
        },
        {
          path: "admin",
          element: <AdminPage />,
        },
      ],
    },
    {
      path: "access",
      element: <AccessTestPage />,
    },
  ],
});

const guestRoutes: RouteObject = {
  element: <GuestRoute />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
  ],
};

export const router = (queryClient: QueryClient) =>
  createBrowserRouter([
    guestRoutes,
    privateRoutes(queryClient),
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
