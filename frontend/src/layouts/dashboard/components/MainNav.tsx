import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export default function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex w-full justify-end items-center", className)} {...props}>
      <div
        className={cn(
          "hidden sm:flex w-full max-w-md h-10 items-center rounded-md border border-input pl-3 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          className
        )}
      >
        <Search className="h-5 w-5 absolute pointer-events-none" />
        <input
          type="search"
          placeholder="Search"
          className="w-full p-2 bg-background pl-8 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </nav>
  );
}
