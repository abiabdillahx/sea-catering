"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { toast } from "react-hot-toast"
import { supabase } from "@/lib/supabaseClient"
import bcrypt from "bcryptjs"


import { Button } from "@/components/ui/button"
import { User, FileUser, Phone, Lock } from "lucide-react"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleRegister = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Password tidak sama")
      return
    }

    if (!/^(\+62|62|08)[0-9]{8,13}$/.test(phone)) {
      toast.error("No HP tidak valid")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, phone, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error("Gagal daftar: " + data.error)
      } else {
        toast.success("Berhasil daftar!")
        router.push("/login")
      }
    } catch (err) {
      toast.error("Terjadi kesalahan server.")
    } finally {
      setLoading(false)
    }
  }


  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-background relative font-outfit">
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

      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-primary">Buat Akun Baru</h1>
            <p className="text-muted-foreground">Daftar untuk mulai menggunakan SEA Catering</p>
          </div>

          <form className="space-y-5" onSubmit={handleRegister}>
            <Field label="Nama Lengkap" value={name} onChange={setName} Icon={User} placeholder="John Doe" />
            <Field label="Username" value={username} onChange={setUsername} Icon={FileUser} placeholder="compfest.sea" />
            <Field label="No HP" value={phone} onChange={setPhone} Icon={Phone} placeholder="+62xxxxxxxxxx" />
            <Field label="Password" value={password} onChange={setPassword} Icon={Lock} type="password" placeholder="••••••••" />
            <Field label="Konfirmasi Password" value={confirmPassword} onChange={setConfirmPassword} Icon={Lock} type="password" placeholder="Ulangi password" />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading ? "Loading..." : "Daftar"}
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

function Field({ label, value, onChange, Icon, type = "text", placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
      <div className="flex items-center border border-input rounded-md px-3 py-2 bg-background focus-within:border-primary transition-all">
        <Icon className="w-4 h-4 mr-2 text-muted-foreground" />
        <input
          type={type}
          placeholder={placeholder}
          className="border-none bg-transparent focus:outline-none p-0 text-sm py-2 w-full"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
        />
      </div>
    </div>
  )
}


function getFriendlyErrorMessage(rawMessage) {
  if (rawMessage.includes("users_username_key")) return "Username sudah digunakan"
  if (rawMessage.includes("users_phone_key")) return "No HP sudah digunakan"
  return "Terjadi kesalahan saat mendaftar"
}
