import { useState } from "react";
import { Button } from "./components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  function onClick() {
    setCount((prev) => prev + 1);
  }

  return (
    <main className="w-full p-5 min-h-screen h-full flex justify-center bg-gradient-to-br from-gray-900 to-emerald-950">
      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-center text-3xl font-bold text-white">Hello world</h1>
        <Button
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={onClick}
        >
          Count is {count}
        </Button>
      </div>
    </main>
  );
}

export default App;
