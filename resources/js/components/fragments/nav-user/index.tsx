import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  KeySquareIcon,
  LogOut
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { usePage } from "@inertiajs/react";
import { createContext, useState } from "react";
import { AlertDialogCredentials } from "./menu-credentials";
import { AlertDialogLogout } from "./menu-logout";

export const NavUserContext = createContext({
  state: {
    showLogoutDialog: false,
    showCredentialsDialog: false,
  },
  actions: {
    setShowLogoutDialog: (show: boolean) => {},
    setShowCredentialsDialog: (show: boolean) => {},
  },
});

export function NavUser() {
  const user = usePage().props.auth.user;
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showCredentialsDialog, setShowCredentialsDialog] = useState(false);

  return (
    <NavUserContext.Provider
      value={{
        state: { showLogoutDialog, showCredentialsDialog },
        actions: { setShowLogoutDialog, setShowCredentialsDialog },
      }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user.avatar ?? ""} alt={user.name} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
            <ChevronsUpDown className="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          side="bottom"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar ?? ""} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup onClick={() => setShowCredentialsDialog(true)}>
            <DropdownMenuItem>
              <KeySquareIcon />
              View Client Credentials
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BadgeCheck />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowLogoutDialog(true)}>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogLogout />
      <AlertDialogCredentials />
    </NavUserContext.Provider>
  );
}
