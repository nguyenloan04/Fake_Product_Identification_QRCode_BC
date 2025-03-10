import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel, SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import ClientIcon from "@/components/ClientIcon.tsx";
import {User} from "@/types/user.type.ts";

// Menu items.
const items = [
    {
        title: "User",
        url: "/admin/user",
        icon: "qlementine-icons:user-24",
        role: 1
    },
    {
        title: "product",
        url: "/admin/product",
        icon: "carbon:product",
        role: 2
    },
]

export function AppSidebar({name, email, role}: User) {
    return (
        <Sidebar>
            <SidebarHeader className="p-4 flex flex-col items-center border-b border-gray-300">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    <span className="text-xl font-bold">JD</span>
                </div>
                <div className="text-center mt-2">
                    <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                    <p className="text-sm text-gray-500">{email}</p>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) =>
                                role <= item.role ? (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                <ClientIcon icon={item.icon} />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ) : null
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
