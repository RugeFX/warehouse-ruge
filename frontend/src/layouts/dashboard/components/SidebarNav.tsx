import { useUserData } from "@/store";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const icons = {
  Home: Home,
};

export default function SidebarNav() {
  const userData = useUserData();

  return (
    <aside className="w-56 h-full min-h-screen border-r">
      <Link to="/dashboard">Dashboard</Link>
    </aside>
  );
}
