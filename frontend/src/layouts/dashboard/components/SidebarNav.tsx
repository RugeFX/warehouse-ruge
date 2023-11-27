import { Icons } from "@/components/Icons";
import { Separator } from "@/components/ui/separator";
import { MenuGroup } from "@/types/user";
import { Circle, Home, UserCheck, type LucideIcon, Warehouse } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const icons: { [key: string]: LucideIcon } = {
  Dashboard: Home,
  Inventory: Warehouse,
  Admin: UserCheck,
};

export default function SidebarNav({ privileges = [] }: { privileges?: MenuGroup[] }) {
  const { pathname } = useLocation();

  return (
    <aside className="w-56 h-full min-h-screen flex flex-col">
      <Link to="/dashboard" className="py-4 flex gap-2 w-full justify-center">
        <Icons.logo className="w-8 h-8 text-primary" />
        <span className="text-xl font-bold hidden sm:block">Warehouse Ruge</span>
      </Link>
      <Separator />
      <div className="my-4 space-y-1">
        {privileges.map(({ name }) => {
          const Icon = icons[name] ?? Circle;
          const selected = pathname === `/${name.toLowerCase()}`;

          return (
            <div key={name} className="flex gap-4">
              <span
                className={`py-5 border-l-foreground border-l-4 rounded-lg transition-transform ${
                  selected ? "translate-x-0" : "-translate-x-4"
                }`}
              />
              <Link
                className={`flex w-full justify-start items-center gap-5 p-3 rounded-lg text-sm transition-colors ${
                  selected
                    ? "text-white bg-primary"
                    : "hover:text-primary hover:bg-muted text-muted-foreground"
                }`}
                to={name.toLowerCase()}
              >
                <Icon className="w-5 h-5" />
                {name}
              </Link>
            </div>
          );
        })}
      </div>
      <Separator />
    </aside>
  );
}
