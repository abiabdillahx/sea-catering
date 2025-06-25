"use client"

import { SessionProvider } from "next-auth/react"

export default function LayoutClient({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
