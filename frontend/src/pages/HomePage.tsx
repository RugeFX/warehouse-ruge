import DemoPayment from "@/components/DemoPayment";
import ThemeToggler from "@/components/ThemeToggler";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import { Link } from "react-router-dom";

export default function HomePage() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);

  return (
    <main className="w-full p-5 min-h-screen h-full bg-gradient-to-br from-gray-100 to-emerald-200 dark:from-gray-900 dark:to-emerald-950">
      <ThemeToggler />
      <div className="flex flex-col gap-3 items-center mb-5">
        <h1 className="text-center text-3xl font-bold text-foreground">Hello world</h1>
        <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => increment(1)}>
          Count is {count}
        </Button>
      </div>
      <div className="mx-auto max-w-lg">
        <DemoPayment />
      </div>
      <Link
        to="login"
        className={cn(
          buttonVariants({ variant: "link" }),
          "absolute right-2 top-2 md:right-4 md:top-4"
        )}
      >
        Goto Login Page
      </Link>
    </main>
  );
}
