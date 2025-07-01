import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import ProfileEdit from "@/components/ProfileEdit"

export default async function UserPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== "USER") {
      redirect("/") 
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {session.user.name}!</h1>
        <p className="text-muted-foreground">
          Manage your meal subscriptions and profile settings.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Edit Section */}
        <ProfileEdit user={session.user} />
        
        {/* Quick Stats or Recent Activity */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Active Subscriptions</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">This Month&apos;s Orders</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Spent</span>
              <span className="font-medium">Rp 0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}