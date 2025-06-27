"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { useSession, signOut } from "next-auth/react"

import { Menu, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Subscription", href: "/subscription" },
    { label: "Contact Us", href: "/contacts" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-accent/30 px-6 border-b border-border backdrop-blur-md">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.png" alt="SEA Logo" width={130} height={120} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 font-poppins text-sm text-foreground">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-primary transition-all duration-200 ${
                pathname === item.href ? "text-primary border-b border-primary" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}

          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button>
                  <Avatar className="w-9 h-9 cursor-pointer">
                    <AvatarImage
                      src={session.user.image || "/avatar-default.png"}
                      alt="avatar"
                    />
                    <AvatarFallback>
                      {session.user.name?.charAt(0) ?? "US"}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className={`cursor-pointer`}
                  onClick={() => {
                    const role = session?.user?.role?.toUpperCase();
                    if (role === "ADMIN") router.push("/admin");
                    else router.push("/user");
                  }}
                >
                  Profil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()} className={`cursor-pointer`}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button className="rounded-full ml-4 cursor-pointer">Log In</Button>
            </Link>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-accent/5 border-t border-border px-4 py-3 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-foreground hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {session?.user ? (
            <div className="pt-2 space-y-1">
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => {
                  router.push("/profile")
                  setIsOpen(false)
                }}
              >
                Profil
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => {
                  signOut()
                  setIsOpen(false)
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button className="w-full mt-2">Log In</Button>
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
