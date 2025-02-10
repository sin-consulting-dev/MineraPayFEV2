import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useContext } from "react";
import { NavUserContext } from ".";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { router } from "@inertiajs/react";

export function AlertDialogLogout() {
  const { showLogoutDialog } = useContext(NavUserContext).state;
  const { setShowLogoutDialog } = useContext(NavUserContext).actions;

  const handleLogout = async () => {
    router.post("/logout");
  };

  return (
    <AlertDialog
      open={showLogoutDialog}
      onOpenChange={() => setShowLogoutDialog(false)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Log Out?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to log out? Your session will be ended and any
            unsaved changes will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Log Out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function MenuLogout() {
  const { setShowLogoutDialog } = useContext(NavUserContext).actions;

  return (
    <DropdownMenuItem onClick={() => setShowLogoutDialog(true)}>
      <LogOut />
      Log out
    </DropdownMenuItem>
  );
}
