"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  Calendar,
  Home,
  Inbox,
  LogOut,
  Search,
  Settings,
  User,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const items = [
  { title: "Home", url: "/user", icon: Home },
  { title: "Inbox", url: "/user/inbox", icon: Inbox },
  { title: "Calendar", url: "/user/calendar", icon: Calendar },
  { title: "Search", url: "/user/search", icon: Search },
  { title: "Settings", url: "/user/settings", icon: Settings },
]

export default function UserSidebarLayout({ children }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
    <SidebarProvider>
      <Sidebar className="w-[250px] border-r bg-muted/40">
        <SidebarContent>
          {/* Header */}
          <div className="flex items-center gap-2 p-4 font-bold text-xl">
            <User className="w-5 h-5" />
            <span>SEA Catering</span>
          </div>

          {/* Menu */}
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent ${
                          pathname === item.url ? "bg-accent text-primary" : ""
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Footer */}
          <div className="mt-auto p-4">
            <div className="flex items-center justify-between gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/avatar-default.png" alt="user" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>

              <Button
                variant="ghost"
                className="text-xs px-2 py-1 hover:bg-red-100 hover:text-red-600"
                onClick={() => signOut()}
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </SidebarContent>
      </Sidebar>

      <main className="flex-1 p-6 overflow-y-auto">
        <SidebarTrigger/>
        {children}
        </main>
      </SidebarProvider>
    </div>
  )
}
