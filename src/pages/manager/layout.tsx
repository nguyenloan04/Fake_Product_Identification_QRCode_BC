import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar.tsx";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router";
import { useAppContext } from "@/AppContext.tsx";

export default function LayoutAdmin() {
  const { user } = useAppContext();
  return (
    <SidebarProvider>
      <AppSidebar {...user} />
      <main className={"flex-1"}>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
