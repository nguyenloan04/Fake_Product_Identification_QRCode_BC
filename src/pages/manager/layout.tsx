import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/app-sidebar.tsx";
import {User} from "@/types/user.type.ts";

export default function Layout(user:User) {
    return <SidebarProvider>
        <AppSidebar  {...user}  />
        <main>
            <SidebarTrigger />
        </main>
    </SidebarProvider>

}