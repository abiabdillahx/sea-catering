"use client"
import { useState } from "react"
import mealPlans from "../../data/mealPlans"
import PlanCard from "@/components/PlanCard"
import PlanModal from "@/components/PlanModal"
import CTA from "@/components/CTA"

export default function MenuPage() {
  const [selectedPlan, setSelectedPlan] = useState(null)

  return (
    <>
    <section className="py-20 px-24 container mx-auto">
      <h1 className="text-4xl font-bold text-center mb-12 text-foreground">Pilih Paket Makanan Anda</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {mealPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} onDetailClick={setSelectedPlan} />
        ))}
      </div>

      {selectedPlan && (
        <PlanModal
          plan={selectedPlan}
          open={!!selectedPlan}
          onOpenChange={(open) => {
            if (!open) setSelectedPlan(null)
          }}
        />
      )}
    </section>
    <CTA/>
    </>
  )
}
