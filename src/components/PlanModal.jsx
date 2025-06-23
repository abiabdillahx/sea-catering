import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Image from "next/image"

export default function PlanModal({ plan, open, onOpenChange }) {
  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{plan?.name}</DialogTitle>
          <DialogDescription>Rp {plan?.price?.toLocaleString()}</DialogDescription>
        </DialogHeader>
        {plan?.image && (
          <Image src={plan.image} alt={plan.name} width={500} height={300} className="rounded-md mb-4" />
        )}
        <p className="text-muted-foreground">{plan?.details}</p>
      </DialogContent>
    </Dialog>
    </>
  )
}
