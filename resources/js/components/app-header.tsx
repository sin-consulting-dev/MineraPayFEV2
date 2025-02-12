import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavUser } from "./fragments/nav-user";

export function AppNavbar() {
  return (
    <header className="flex h-16 items-center justify-between gap-2 sticky">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
      </div>
      <div className="flex items-center gap-2 px-4">
        <NavUser />
      </div>
    </header>
  );
}
