import SidebarTes from "@/components/Sidebar"

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <SidebarTes variant="admin" />
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
