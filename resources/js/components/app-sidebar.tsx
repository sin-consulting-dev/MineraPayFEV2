import {
  Building2Icon,
  CodeXmlIcon,
  Command,
  ContactIcon,
  FolderPlusIcon,
  GlobeIcon,
  HomeIcon,
  LifeBuoy,
  ListChecksIcon,
  MailCheckIcon,
  ScrollTextIcon,
  Send,
  ShieldIcon,
  UserIcon,
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
import { Button } from "./ui/button";
import { Link } from "@inertiajs/react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = {
    navMain: [
      {
        title: "Merchant Dashboard",
        url: "/",
        icon: HomeIcon,
        isActive: window.location.pathname === "/",
      },
      {
        title: "Merchant Domain List",
        url: "/merchant/domain",
        icon: GlobeIcon,
        isActive: window.location.pathname === "/merchant/domain",
      },
    ],
    navDeposit: [
      {
        title: "Deposit List",
        url: "/deposit",
        isActive: window.location.pathname.startsWith("/deposit"),
        icon: ScrollTextIcon,
      },
    ],
    navWithdrawal: [
      {
        title: "Withdraw List",
        url: "/withdraw",
        isActive: window.location.pathname.startsWith("/withdraw"),
        icon: ScrollTextIcon,
      },
    ],
    navDisbursement: [
      {
        title: "Bank Details",
        url: "/merchant/bank-account",
        icon: Building2Icon,
      },
      {
        title: "Submit Disbursement",
        url: "/disbursement/create",
        icon: FolderPlusIcon,
      },
      {
        title: "Disbursement List",
        url: "/disbursement",
        icon: ListChecksIcon,
      },
    ],
    navGuideline: [
      {
        title: "API Docs",
        icon: ScrollTextIcon,
        onClick: () => {
          window.open("https://minerapay.com", "_blank");
        },
      },
      {
        title: "SDK Implementation Docs",
        icon: CodeXmlIcon,
        onClick: () => {
          window.open("https://sdk.minerapay.com", "_blank");
        },
      },
    ],
    navMasterData: [
      {
        title: "Staff Management",
        url: "/staff",
        icon: UserIcon,
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
        <div className="px-2 flex flex-col gap-2">
          <Link href="/onboarding">
            <Button className="flex items-center bg-amber-600 hover:bg-amber-500 active:bg-amber-700 w-full">
              <MailCheckIcon />
              <span>Finish Registration</span>
            </Button>
          </Link>
        </div>
        <NavMain items={data.navMain} title="Account Information" />
        <NavMain items={data.navDeposit} title="Deposit Information" />
        <NavMain items={data.navWithdrawal} title="Withdrawal Information" />
        <NavMain
          items={data.navDisbursement}
          title="Disbursement Information"
        />
        <NavMain items={data.navMasterData} title="Master Data" />
        <NavMain items={data.navGuideline} title="Guidelines" />
      </SidebarContent>
    </Sidebar>
  );
}
