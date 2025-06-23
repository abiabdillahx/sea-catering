"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Lock, User } from "lucide-react"
import Image from "next/image"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-background relative font-outfit">
      
      {/* Left Image */}
      <div className="hidden md:flex items-center justify-center bg-accent/30">
        <Image
          src="/assets/chef.png"
          alt="SEA Chef"
          width={450}
          height={500}
          className="object-contain"
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
              <div className="flex items-center border border-input rounded-md px-3 py-2 bg-background">
                <User className="w-4 h-4 mr-2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Nama lengkap"
                  className="border-none bg-transparent focus:outline-none p-0"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
              <div className="flex items-center border border-input rounded-md px-3 py-2 bg-background">
                <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="you@example.com"
                  className="border-none bg-transparent focus:outline-none p-0"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Password</label>
              <div className="flex items-center border border-input rounded-md px-3 py-2 bg-background">
                <Lock className="w-4 h-4 mr-2 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="border-none bg-transparent focus:outline-none p-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Konfirmasi Password</label>
              <div className="flex items-center border border-input rounded-md px-3 py-2 bg-background">
                <Lock className="w-4 h-4 mr-2 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Ulangi password"
                  className="border-none bg-transparent focus:outline-none p-0"
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
