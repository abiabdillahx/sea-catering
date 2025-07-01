"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import {
  Calendar,
  Home,
  Inbox,
  LogOut,
  Search,
  Settings,
  User,
  Users,
  Package,
  BarChart3,
  FileText,
  Shield
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
import Image from "next/image"

// Menu items untuk user
const userItems = [
  { title: "Home", url: "/user", icon: Home },
  { title: "My Subscription", url: "/user/subscription", icon: Package },
  { title: "Settings", url: "/user/settings", icon: Settings },
]

// Menu items untuk admin
const adminItems = [
  { title: "Dashboard", url: "/admin", icon: Home },
  { title: "Manage Users", url: "/admin/users", icon: Users },
  { title: "Subscriptions", url: "/admin/subscriptions", icon: Package },
  { title: "Meal Plans", url: "/admin/meal-plans", icon: FileText },
  { title: "Analytics", url: "#", icon: BarChart3 },
  { title: "Settings", url: "/admin/settings", icon: Settings },
]

export default function DashboardLayout({ children }) {
  const pathname = usePathname()
  const { data: session } = useSession()
  
  // Determine which items to show based on role
  const isAdmin = session?.user?.role === "ADMIN"
  const items = isAdmin ? adminItems : userItems
  const rolePrefix = isAdmin ? "admin" : "user"

  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <Sidebar className="w-[250px] border-r bg-muted/40">
          <SidebarContent>
            {/* Header */}
            <div className="flex items-center gap-2 p-4 font-bold text-xl">
              <Image 
                src="/logo.png" 
                alt="SEA Catering" 
                className="w-27 h-10"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <User className="w-5 h-5 hidden" />
              {/* <span>SEA Catering</span> */}
            </div>

            {/* Role Badge */}
            <div className="px-4 pb-2">
              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                isAdmin 
                  ? "bg-red-100 text-red-800" 
                  : "bg-blue-100 text-blue-800"
              }`}>
                <Shield className="w-3 h-3" />
                {isAdmin ? "Admin Panel" : "User Dashboard"}
              </div>
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
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage 
                      src={session?.user?.image || "/avatar-default.png"} 
                      alt="user" 
                    />
                    <AvatarFallback>
                      {session?.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium truncate max-w-[100px]">
                      {session?.user?.name || "User"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {isAdmin ? "Admin" : "User"}
                    </span>
                  </div>
                </div>

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