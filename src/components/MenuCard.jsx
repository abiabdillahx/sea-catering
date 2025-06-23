"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function MenuCard({ meal, onDetailClick }) {
  return (
    <Card
      onClick={() => onDetailClick(meal)}
      className="hover:shadow-xl cursor-pointer transition-transform duration-200 hover:scale-105"
    >
      <CardHeader className="p-0">
        <img
          src={meal.image}
          alt={meal.name}
          className="rounded-t-lg w-full h-40 object-cover"
        />
      </CardHeader>

      <CardContent className="space-y-2 p-4">
        <h3 className="text-lg font-semibold">{meal.name}</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{meal.plan}</Badge>
          {meal.tags.map((tag, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">{tag}</Badge>
          ))}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {meal.description}
        </p>

        <div className="text-right mt-2">
          <Button
            size="sm"
            className="cursor-pointer"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation()
              onDetailClick(meal)
            }}
          >
            Lihat Detail
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
