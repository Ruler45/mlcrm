import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { User2 } from "lucide-react"

export function AppSidebar() {
  return (
   <Sidebar>
  <SidebarHeader>
    <SidebarMenu>
      <SidebarMenuItem>
        <User2 className="mr-2" />
        Profile
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>
</Sidebar>
  )
}