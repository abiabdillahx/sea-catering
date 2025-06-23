import { Dialog, DialogHeader, DialogContent, DialogTitle } from "./ui/dialog"
import { Badge } from "./ui/badge";

export default function MenuModal({ meal, open, onOpenChange }){
    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg">
            <img src={meal.image} alt={meal.name} className="rounded-lg w-full h-48 object-cover" />
            <DialogHeader>
            <DialogTitle>{meal.name}</DialogTitle>
            <p className="text-sm text-muted-foreground">{meal.description}</p>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
                <p className="text-sm text-muted-foreground">Kalori</p>
                <p className="font-semibold">{meal.calories} kcal</p>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Protein</p>
                <p className="font-semibold">{meal.protein}g</p>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Karbo</p>
                <p className="font-semibold">{meal.carbs}g</p>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Lemak</p>
                <p className="font-semibold">{meal.fat}g</p>
            </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant="outline">{meal.plan}</Badge>
            {meal.tags.map((tag, i) => (
                <Badge key={i} variant="secondary">{tag}</Badge>
            ))}
            </div>
        </DialogContent>
        </Dialog>
    );
}
