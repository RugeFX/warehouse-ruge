import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useLogout from "@/hooks/query/useLogout";
import { useRefreshToken, useUserData } from "@/store";
import { UserIcon } from "lucide-react";

export default function UserNav() {
  const navigate = useNavigate();
  const refreshToken = useRefreshToken();
  const userData = useUserData();
  const { mutateAsync: logoutMutate } = useLogout();

  const onLogoutClicked = () => {
    if (refreshToken) {
      logoutMutate({ refreshToken })
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userData?.staff.image} alt={userData?.username} />
            <AvatarFallback>
              {userData?.username
                .toUpperCase()
                .split(" ")
                .map((v) => v[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userData?.username}</p>
            <p className="text-xs leading-none text-muted-foreground">{userData?.staff.name}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/profile" className="flex justify-between">
              Profile <UserIcon className="w-5 h-5" />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button className="w-full focus:bg-red-900" onClick={onLogoutClicked}>
            Log out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}