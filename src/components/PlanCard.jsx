import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function PlanCard({ plan, onDetailClick }) {
  return (
    <div className="bg-card border border-border rounded-lg shadow-sm p-4 flex flex-col items-center text-center">
      <Image src={plan.image} alt={plan.name} width={300} height={200} className="rounded-lg mb-4 object-cover" />
      <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
      <p className="text-sm text-muted-foreground mb-2">Rp {plan.price.toLocaleString()}</p>
      <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
      <Button className="cursor-pointer" onClick={() => onDetailClick(plan)}>Lihat Detail</Button>
    </div>
  )
}
