import { useUserData } from "@/store";
import { PiIcon } from "lucide-react";
import { Link } from "react-router-dom";

const icons = {
  Home: PiIcon,
};

export default function SidebarNav() {
  const userData = useUserData();

  return (
    <aside className="w-56 h-full min-h-screen">
      <Link to="/dashboard">Dashboard</Link>
    </aside>
  );
}
