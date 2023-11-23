import { Icons } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePrivileges } from "@/store";
import { Circle, Home, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

const icons: { [key: string]: LucideIcon } = {
  Dashboard: Home,
};

export default function SidebarNav() {
  const privileges = usePrivileges()!;

  return (
    <aside className="w-56 h-full min-h-screen border-r flex flex-col">
      <div className="py-4 flex gap-2 w-full justify-center pointer-events-none">
        <Icons.logo className="w-8 h-8 text-primary" />
        <span className="text-xl font-bold hidden sm:block">Warehouse Ruge</span>
      </div>
      <Separator />
      {privileges.map(({ name }) => {
        const Icon = icons[name] ?? Circle;
        return (
          <Link
            key={name}
            className={cn(buttonVariants({ variant: "ghost" }), "justify-start gap-4 px-4")}
            to={name.toLowerCase()}
          >
            <Icon />
            {name}
          </Link>
        );
      })}
    </aside>
  );
}
