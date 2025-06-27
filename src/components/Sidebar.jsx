"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  User,
  Utensils,
  Users,
  LogOut,
} from "lucide-react"
import { signOut } from "next-auth/react"

const sidebarLinks = {
  user: [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Profil", href: "/profile", icon: User },
  ],
  admin: [
    { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { title: "Kelola Menu", href: "/admin/menus", icon: Utensils },
    { title: "Kelola Pengguna", href: "/admin/users", icon: Users },
  ],
}

export default function SidebarTes({ variant = "user" }) {
  const pathname = usePathname()

  const links = sidebarLinks[variant] || []

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-muted p-4">
      <div className="mb-6 text-xl font-bold">SEA Catering</div>
      <nav className="flex flex-col gap-2 flex-grow">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-accent
              ${pathname === item.href ? "bg-accent text-primary font-semibold" : "text-muted-foreground"}`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
      <button
        onClick={() => signOut()}
        className="mt-auto flex items-center gap-2 px-3 py-2 text-red-500 hover:bg-red-100 rounded-md"
      >
        <LogOut className="w-5 h-5" />
        Keluar
      </button>
    </div>
  )
}
