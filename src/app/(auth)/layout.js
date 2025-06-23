import "../globals.css"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: 'Get Started - SEA Catering',
  description: 'Log In to SEA Catering',
}

export default function AuthLayout({ children }) {
  return (
    <>
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