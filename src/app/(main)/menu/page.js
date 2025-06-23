"use client"

import { useState } from "react"
import menus from "../../data/menus"
import MenuCard from "@/components/MenuCard"
import MenuModal from "@/components/MenuModal"
import CTA from "@/components/CTA"

export default function MenuPage() {
  const [selectedMeal, setSelectedMeal] = useState(null)

  return (
    <>
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-foreground">
          Pilih Menu Favorit Anda
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menus.map((meal) => (
            <MenuCard key={meal.id} meal={meal} onDetailClick={setSelectedMeal} />
          ))}
        </div>

        {/* Modal Pop Up */}
        {selectedMeal && (
          <MenuModal
            meal={selectedMeal}
            open={!!selectedMeal}
            onOpenChange={(open) => {
              if (!open) setSelectedMeal(null)
            }}
          />
        )}
      </section>

      <CTA />
    </>
  )
}
