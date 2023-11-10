import { useState } from "react";
import { Button } from "./components/ui/button";
import DemoPayment from "./components/DemoPayment";
import { ThemeProvider } from "./components/ThemeProvider";
import ThemeToggler from "./components/ThemeToggler";

function App() {
  const [count, setCount] = useState(0);

  function onClick() {
    setCount((prev) => prev + 1);
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <main className="w-full p-5 min-h-screen h-full bg-gradient-to-br from-gray-900 to-emerald-950">
        <ThemeToggler />
        <div className="flex flex-col gap-3 items-center mb-5">
          <h1 className="text-center text-3xl font-bold text-white">Hello world</h1>
          <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={onClick}>
            Count is {count}
          </Button>
        </div>
        <div className="mx-auto max-w-lg">
          <DemoPayment />
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
