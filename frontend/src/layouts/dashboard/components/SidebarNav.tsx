import { Link, useLocation } from "react-router-dom";
import {
  type LucideIcon,
  Circle,
  Home,
  UserCheck,
  Warehouse,
  ChevronDown,
  Package,
} from "lucide-react";
import { Icons } from "@/components/Icons";
import { Separator } from "@/components/ui/separator";
import { type MenuGroup } from "@/types/user";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useNavActions, useNavItemsState } from "@/store";

const icons: { [key: string]: LucideIcon } = {
  Dashboard: Home,
  Inventory: Warehouse,
  Admin: UserCheck,
};

const submenuIcons: { [key: string]: LucideIcon } = {
  Product: Package,
};

export default function SidebarNav({ privileges = [] }: { privileges?: MenuGroup[] }) {
  const navItemsState = useNavItemsState();
  const { setItemState } = useNavActions();

  const { pathname } = useLocation();
  const pathArray = pathname.slice(1).split("/");

  return (
    <aside className="w-56 h-full min-h-screen flex flex-col">
      <Link to="/dashboard" className="py-4 flex gap-2 w-full justify-center">
        <Icons.logo className="w-8 h-8 text-primary" />
        <span className="text-xl font-bold hidden sm:block">Warehouse Ruge</span>
      </Link>
      <Separator />
      <div className="my-4 space-y-1">
        <Item
          label="Dashboard"
          Icon={icons["Dashboard"]}
          to="dashboard"
          selected={pathArray[0] === "dashboard"}
          asTrigger={false}
        />
        {privileges.map(({ name, menuItem }) => {
          if (name === "Dashboard") return;

          const Icon = icons[name] ?? Circle;
          const selected = pathArray[0] === name.toLowerCase();
          const open = navItemsState[name] === true;

          return (
            <Collapsible
              open={open}
              onOpenChange={(open) => {
                setItemState(name, !selected ? true : open);
              }}
              key={name}
            >
              <Item
                asTrigger
                label={name}
                Icon={Icon}
                to={name.toLowerCase()}
                selected={selected}
                open={open}
              />
              <CollapsibleContent
                className={`ml-6 mt-1 flex flex-col gap-1 rounded-lg bg-muted overflow-hidden`}
              >
                {menuItem.map(({ name: subName }) => {
                  const SubIcon = submenuIcons[subName] ?? Circle;
                  const menuSelected = pathArray[1] === subName.toLowerCase();

                  return (
                    <Submenu
                      key={subName}
                      label={subName}
                      Icon={SubIcon}
                      to={`${name.toLowerCase()}/${subName.toLowerCase()}`}
                      selected={menuSelected}
                    />
                  );
                })}
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>
      <Separator />
    </aside>
  );
}

type ItemProps = {
  label: string;
  Icon: LucideIcon;
  to: string;
  selected?: boolean;
} & ({ asTrigger: true; open: boolean } | { asTrigger: false });

function Item(props: ItemProps) {
  return (
    <div className="w-full flex gap-4">
      <span
        className={`border-l-foreground border-l-4 rounded-lg transition-transform ${
          props.selected ? "translate-x-0" : "-translate-x-4"
        }`}
      />
      {props.asTrigger ? (
        <CollapsibleTrigger asChild>
          <Link
            className={`flex w-full justify-start items-center gap-5 p-3 rounded-lg text-sm transition-colors ${
              props.selected
                ? "text-white bg-primary"
                : "hover:text-primary hover:bg-muted text-muted-foreground"
            }`}
            to={props.to}
          >
            <props.Icon className="w-5 h-5" />
            <span className="flex-1">{props.label}</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${props.open ? "-rotate-180" : "rotate-0"}`}
            />
          </Link>
        </CollapsibleTrigger>
      ) : (
        <Link
          className={`flex w-full justify-start items-center gap-5 p-3 rounded-lg text-sm transition-colors ${
            props.selected
              ? "text-white bg-primary"
              : "hover:text-primary hover:bg-muted text-muted-foreground"
          }`}
          to={props.to}
        >
          <props.Icon className="w-5 h-5" />
          <span className="flex-1">{props.label}</span>
        </Link>
      )}
    </div>
  );
}

interface SubmenuProps {
  label: string;
  Icon: LucideIcon;
  to: string;
  selected?: boolean;
}

function Submenu({ label, Icon, to, selected }: SubmenuProps) {
  return (
    <Link
      className={`flex w-full justify-start items-center gap-5 py-2.5 px-3 text-sm hover:text-primary transition-colors ${
        selected ? "text-primary" : "text-muted-foreground"
      }`}
      to={to}
    >
      <Icon className="w-5 h-5" />
      {label}
    </Link>
  );
}
