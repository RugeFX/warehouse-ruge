import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import TodosPage from "@/pages/TodosPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import { type RouteObject, createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";
import AccessTestPage from "@/pages/AccessTestPage";

const privateRoutes: RouteObject = {
  element: <PrivateRoute />,
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
