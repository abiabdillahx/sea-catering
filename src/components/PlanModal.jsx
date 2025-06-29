import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function PlanModal({ plan, open, onOpenChange, onSelectPlan }) {
  const handleSelectPlan = () => {
    if (onSelectPlan && plan) {
      onSelectPlan(plan.id)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{plan?.name}</DialogTitle>
          <DialogDescription className="text-lg font-semibold text-primary">
            Rp {plan?.price?.toLocaleString('id-ID')} / porsi
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {plan?.image && (
            <div className="relative aspect-video overflow-hidden rounded-md">
              <Image 
                src={plan.image} 
                alt={plan.name} 
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <div>
            <h4 className="font-medium mb-2">Deskripsi:</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {plan?.description}
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Detail:</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {plan?.details}
            </p>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Tutup
          </Button>
          <Button 
            onClick={handleSelectPlan}
            className="flex-1"
          >
            Pilih Paket
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}