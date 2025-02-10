import { AppNavbar } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar";
import { usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode } from "react";

export default function Authenticated({
  children,
}: PropsWithChildren<{ header?: ReactNode }>) {
  const user = usePage().props.auth.user;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppNavbar />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
