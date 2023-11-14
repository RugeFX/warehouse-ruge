import HomePage from "@/pages/HomePage";
import TodosPage from "@/pages/TodosPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "todos",
        element: <TodosPage />,
      },
    ],
  },
]);
