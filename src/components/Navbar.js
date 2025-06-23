"use client"
import { ChefHat, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Subscription", href: "/subscription" },
    { label: "Contact Us", href: "/contacts" },
  ]

  return (
    <header className="select-none justify-items-center sticky top-0 z-50 bg-accent/30 px-15 transition-all border-b duration-200 border-border backdrop-blur-md">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href='/'>
            <Image
              className=''
              alt='SEA Logo'
              src='/logo.png'
              width={130}
              height={120}
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 font-poppins text-sm text-foreground">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`transition-all duration-200 hover:text-primary hover:border-b hover:border-primary hover:-translate-y-0.5 ${
                pathname === item.href
                  ? "text-primary border-b border-primary"
                  : ""
              }`}
            >
              {item.label}
            </a>
          ))}
          <Link href="/login">
            <Button className=" rounded-full ml-4 bg-primary text-primary-foreground hover:bg-foreground duration-200 font-medium cursor-pointer">
              Log In
            </Button>
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-accent/5 border-t border-border px-4 py-3 space-y-2 font-poppins">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Link href='/login'>
            <Button className="rounded-full w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium mt-2">
              Log In
            </Button>
          </Link>
        </div>
      )}
    </header>
  )
}
