"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Lock, User, FileUser } from "lucide-react"
import Image from "next/image"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-background relative font-outfit">
      
      {/* Left Image */}
      <div className="hidden md:flex items-center justify-center bg-accent/60">
        <Image
          src="/assets/chef.png"
          alt="SEA Chef"
          width={450}
          height={500}
          className="object-contain select-none"
          priority
        />
      </div>

      {/* Right Register Form */}
      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-primary">Buat Akun Baru</h1>
            <p className="text-muted-foreground">Daftar untuk mulai menggunakan SEA Catering</p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Nama Lengkap *</label>
              <div className="flex items-center border border-input rounded-md px-3 py-2 bg-background focus-within:border-primary transition-all duration-200">
                <User className="w-4 h-4 mr-2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="border-none bg-transparent focus:outline-none p-0 text-sm py-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Username *</label>
              <div className="flex items-center border border-input rounded-md px-3 py-2 bg-background focus-within:border-primary transition-all duration-200">
                <FileUser className="w-4 h-4 mr-2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="compfest.sea"
                  className="border-none bg-transparent focus:outline-none p-0 py-2 text-sm"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
              <div className="flex items-center border border-input rounded-md px-3 py-2 bg-background focus-within:border-primary transition-all duration-200">
                <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="you@gmail.com"
                  className="border-none bg-transparent focus:outline-none p-0 py-2 text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Password</label>
              <div className="flex items-center border border-input rounded-md px-3 py-2 bg-background focus-within:border-primary transition-all duration-200">
                <Lock className="w-4 h-4 mr-2 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="border-none bg-transparent focus:outline-none focus:ring-0 focus:border-transparent py-2 text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Konfirmasi Password</label>
              <div className="flex items-center border border-input rounded-md px-3 py-2 bg-background focus-within:border-primary transition-all duration-200">
                <Lock className="w-4 h-4 mr-2 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="Ulangi password"
                  className="border-none bg-transparent focus:outline-none focus:ring-0 focus:border-none py-2 text-sm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Daftar
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <a href="/login" className="text-primary hover:underline">
              Masuk di sini
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
