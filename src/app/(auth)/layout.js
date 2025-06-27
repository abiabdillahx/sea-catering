import "../globals.css"
import Link from "next/link"
import Image from "next/image"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

import { Toaster } from "react-hot-toast"

export const metadata = {
  title: 'Get Started - SEA Catering',
  description: 'Log In to SEA Catering',
}

export default async function AuthLayout({ children }) {
  const session = await getServerSession(authOptions)
  
  if (session?.user?.role === "ADMIN" || session?.user?.role === "USER") {
    redirect("/")
  }

  return (
    <>
    <Toaster position="top-center" />
        {/* Logo fixed di pojok kiri atas */}
        <div className="absolute top-8 left-10 z-50">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="SEA Logo"
              width={120}
              height={80}
              priority
              className="object-contain select-none"
            />
          </Link>
        </div>

        {/* Content */}
        {children}
    </>
  )
}