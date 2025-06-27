import Sidebar from "@/components/sidebar"

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar variant="admin" />
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
