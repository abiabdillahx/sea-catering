"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Lock } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border space-y-6">
        <Image
            src='/logo.png'
            alt='SEA Logo'
            className="justify-items-center"
            width='300'
            height='15'
        />
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">Selamat Datang</h1>
          <p className="text-muted-foreground">Masuk untuk melanjutkan ke SEA Catering</p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email</label>
            <div className="flex items-center border border-input rounded-md px-3 py-2 bg-background">
              <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
              <Input
                type="email"
                placeholder="you@example.com"
                className="border-none bg-transparent focus:outline-none p-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Masuk
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Belum punya akun? <a href="/register" className="text-primary hover:underline">Daftar di sini</a>
        </p>
      </div>
    </div>
  )
}
