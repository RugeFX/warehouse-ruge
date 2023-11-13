import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { router } from "./routes";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
