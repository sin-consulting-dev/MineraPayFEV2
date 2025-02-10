import {
  CheckCircleIcon,
  Command,
  ContactIcon,
  HomeIcon,
  IdCardIcon,
  LifeBuoy,
  ListChecksIcon,
  LogsIcon,
  ScrollTextIcon,
  Send,
  ShieldIcon,
  UserIcon
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: "/",
        icon: HomeIcon,
        isActive: window.location.pathname === "/",
      },
      {
        title: "Merchant Center",
        url: "/",
        icon: IdCardIcon,
      },
      {
        title: "Merchant Approval",
        url: "/",
        icon: CheckCircleIcon,
      },
    ],
    navTransactions: [
      {
        title: "Settlement",
        url: "/",
        icon: ListChecksIcon,
      },
      {
        title: "Settlement Logs",
        url: "/",
        icon: LogsIcon,
      },
      {
        title: "Transaction Logs",
        url: "/",
        icon: ScrollTextIcon,
      },
    ],
    navConfiguration: [
      {
        title: "Users",
        url: "/",
        icon: UserIcon,
      },
      {
        title: "Roles",
        url: "/",
        icon: ShieldIcon,
      },
      {
        title: "Admin",
        url: "/",
        icon: ContactIcon,
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
      },
    ],
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">MineraPay</span>
                  <span className="truncate text-xs">Merchant Dashboard</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavMain items={data.navTransactions} title="Transactions" />
        <NavMain items={data.navConfiguration} title="Configuration" />
        <NavMain items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  );
}
