"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Lock, Phone } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import toast from "react-hot-toast"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()

    setLoading(true)
    const res = await signIn("credentials", {
        redirect: false,
        identifier: username,
        password,
      })

      if (res?.error) {
        toast.error("Login gagal: " + res.error)
      } else {
        toast.success("Berhasil login!")
        router.push("/")
      }
      setLoading(false)
    }

  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-background relative font-outfit">
      {/* Left Image */}
      <div className="hidden md:flex items-center justify-center bg-accent/30">
        <Image
          src="/assets/chef.png"
          alt="SEA Chef"
          width={450}
          height={500}
          className="object-contain select-none"
          priority
        />
      </div>

      {/* Right Login Form */}
      <div className="flex items-center justify-center px-6 py-10 ">
        <div className="w-full max-w-md bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-primary">Selamat Datang</h1>
            <p className="text-muted-foreground">
              Masuk untuk melanjutkan ke SEA Catering
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <Field
              label="Username atau No HP"
              value={username}
              onChange={setUsername}
              Icon={Phone}
              placeholder="compfest.sea atau 08xxxx"
            />
            <Field
              label="Password"
              value={password}
              onChange={setPassword}
              Icon={Lock}
              type="password"
              placeholder="••••••••"
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading ? "Loading..." : "Masuk"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <a href="/register" className="text-primary hover:underline">
              Daftar di sini
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
