"use client"
import { useState } from "react"
import { useSession } from "next-auth/react"
import mealPlans from "../../data/mealPlans"
import PlanCard from "@/components/PlanCard"
import PlanModal from "@/components/PlanModal"
import SubscriptionForm from "@/components/SubscriptionForm"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [selectedPlanForForm, setSelectedPlanForForm] = useState(null)
  const { data: session, status } = useSession()

  const handlePlanSelect = (planId) => {
    const plan = mealPlans.find(p => p.id === planId)
    setSelectedPlanForForm(plan)
    setSelectedPlan(null) // Close modal
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Plan Selection Section */}
      <section className="py-20 px-4 sm:px-10 md:px-16 lg:px-24 container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-foreground">
          Pilih Paket Makanan Anda
        </h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Pilih paket yang sesuai dengan kebutuhan kesehatan dan gaya hidup Anda
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {mealPlans.map((plan) => (
            <PlanCard 
              key={plan.id} 
              plan={plan} 
              onDetailClick={setSelectedPlan} 
            />
          ))}
        </div>

        {selectedPlan && (
          <PlanModal
            plan={selectedPlan}
            open={!!selectedPlan}
            onOpenChange={(open) => {
              if (!open) setSelectedPlan(null)
            }}
            onSelectPlan={handlePlanSelect}
          />
        )}
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-24">
        <Separator className="my-8" />
      </div>

      {/* Subscription Form Section */}
      <section className="pb-20 px-4 sm:px-10 md:px-16 lg:px-24 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground">
            Formulir Berlangganan
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Lengkapi informasi di bawah untuk memulai langganan makanan sehat Anda
          </p>

          {status === "loading" ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : !session ? (
            <div className="text-center py-12">
              <div className="bg-muted/50 rounded-lg p-8 max-w-md mx-auto">
                <h3 className="text-xl font-semibold mb-4">Login dulu yuk, biar bisa pesan menunya</h3>
                <p className="text-muted-foreground mb-6">
                  Kamu perlu login terlebih dahulu untuk bisa melakukan pemesanan
                </p>
                <Link 
                  href="/login"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  Login Sekarang
                </Link>
              </div>
            </div>
          ) : (
            <SubscriptionForm 
              preSelectedPlan={selectedPlanForForm}
              userData={{
                name: session.user?.name,
                phone: session.user?.phone
              }}
            />
          )}
        </div>
      </section>
    </div>
  )
}