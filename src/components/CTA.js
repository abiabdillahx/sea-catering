import Link from "next/link"
import { Button } from "./ui/button"
import { LogIn } from "lucide-react"

export default function CTA() {
    return (
        <>
        {/* CTA Section */}
        <section className="pt-20 pb-10 bg-primary text-primary-foreground font-outfit">
        <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Mulai Hidup Sehat Hari Ini!
            </h2>
            <p className="text-lg md:text-xl mb-10 text-primary-foreground/90 leading-relaxed">
                Bergabunglah dengan ribuan pelanggan yang telah merasakan manfaat makanan sehat dari SEA Catering.
                Konsultasi gratis untuk menu yang sesuai dengan kebutuhan Anda.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-12">
                <Link href='/login'>
                    <Button
                    size="lg"
                    className="cursor-pointer bg-background text-primary hover:bg-accent hover:text-foreground px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
                    >
                    <LogIn className="mr-2 h-5 w-5" />
                    Start Here
                    </Button>
                </Link>
            </div>
            </div>
        </div>
        </section>
        </>
    )
}