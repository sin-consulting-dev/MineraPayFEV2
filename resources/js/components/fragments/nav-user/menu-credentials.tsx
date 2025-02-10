import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut } from "lucide-react";
import { useContext } from "react";
import { toast } from "sonner";
import { NavUserContext } from ".";

export function AlertDialogCredentials() {
  const { showCredentialsDialog } = useContext(NavUserContext).state;
  const { setShowCredentialsDialog } = useContext(NavUserContext).actions;

  const handleCopy = (value: string) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(value)
        .then(() => {
          toast.success("Copied to clipboard.");
        })
        .catch((err) => {
          toast.error(`Could not copy text: ${err}`);
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = value;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        toast.success("Copied to clipboard.");
      } catch (err) {
        toast.error(`Could not copy text: ${err}`);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <Dialog
      open={showCredentialsDialog}
      onOpenChange={() => setShowCredentialsDialog(false)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Client Credentials</DialogTitle>
          <DialogDescription>
            Your client credentials are used to authenticate with the API. If
            you believe your credentials have been compromised, please contact
            support.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Client ID</Label>
            <Input
              readOnly
              value="1234567890"
              onClick={() => handleCopy("1234567890")}
            />
          </div>
          <div className="space-y-2">
            <Label>Client Secret</Label>
            <Input
              readOnly
              value="1234567890"
              onClick={() => handleCopy("1234567890")}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => setShowCredentialsDialog(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function MenuCredentials() {
  const { setShowCredentialsDialog } = useContext(NavUserContext).actions;

  return (
    <DropdownMenuItem onClick={() => setShowCredentialsDialog(true)}>
      <LogOut />
      Log out
    </DropdownMenuItem>
  );
}
