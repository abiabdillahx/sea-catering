"use client"
import { useState } from "react"
import mealPlans from "../data/mealPlans"
import MealCard from "@/components/MealCard"
import MealModal from "@/components/MealModal"
import CTA from "@/components/CTA"

export default function MenuPage() {
  const [selectedMeal, setSelectedMeal] = useState(null)

  return (
    <>
    <section className="py-20 px-16 container mx-auto font-outfit">
      <h1 className="text-4xl font-bold text-center mb-12 text-foreground">Pilih Paket Makanan Anda</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {mealPlans.map((meal) => (
          <MealCard key={meal.id} meal={meal} onDetailClick={setSelectedMeal} />
        ))}
      </div>

      {selectedMeal && (
        <MealModal
          meal={selectedMeal}
          open={!!selectedMeal}
          onOpenChange={(open) => {
            if (!open) setSelectedMeal(null)
          }}
        />
      )}
    </section>
    <CTA/>
    </>
  )
}
