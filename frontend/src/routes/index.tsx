import { type RouteObject, createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/login";
import NotFoundPage from "@/pages/NotFoundPage";
import TodosPage from "@/pages/todos";
import DashboardPage from "@/pages/dashboard";
import AccessTestPage from "@/pages/AccessTestPage";
import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";
import ProfilePage from "@/pages/profile";
import DashboardLayout from "@/layouts/dashboard";

const privateRoutes: RouteObject = {
  element: <PrivateRoute />,
  children: [
    {
      element: <DashboardLayout />,
      children: [
        {
          path: "dashboard",
          element: <DashboardPage />,
        },
        {
          path: "todos",
          element: <TodosPage />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
      ],
    },
    {
      path: "access",
      element: <AccessTestPage />,
    },
  ],
};

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

export const router = createBrowserRouter([
  guestRoutes,
  privateRoutes,
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
