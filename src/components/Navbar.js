"use client"
import { ChefHat, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { label: "Beranda", href: "#home" },
    { label: "Layanan", href: "#services" },
    { label: "Menu", href: "#menu" },
    { label: "Testimoni", href: "#testimonials" },
    { label: "Kontak", href: "#contact" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border backdrop-blur-md">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <ChefHat className="text-primary w-6 h-6" />
          <span className="text-xl font-bold tracking-tight text-foreground font-poppins">
            SEA Catering
          </span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 font-poppins text-sm text-foreground">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
          <Button className="ml-4 bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
            <Link href="github.com">
              Pesan Sekarang
            
            </Link>
          </Button>
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
        <div className="md:hidden bg-background border-t border-border px-4 py-3 space-y-2 font-poppins">
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
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium mt-2">
            Pesan Sekarang
          </Button>
        </div>
      )}
    </header>
  )
}
