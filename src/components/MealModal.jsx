import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Image from "next/image"

export default function MealModal({ meal, open, onOpenChange }) {
  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{meal?.name}</DialogTitle>
          <DialogDescription>Rp {meal?.price?.toLocaleString()}</DialogDescription>
        </DialogHeader>
        {meal?.image && (
          <Image src={meal.image} alt={meal.name} width={500} height={300} className="rounded-md mb-4" />
        )}
        <p className="text-muted-foreground">{meal?.details}</p>
      </DialogContent>
    </Dialog>
    </>
  )
}
