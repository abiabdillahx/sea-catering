"use client"

import {
  Utensils,
  CheckCircle,
  ArrowRight,
  Truck,
  SlidersHorizontal,
  BarChart3,
  Shield,
  Clock,
  MapPin,
  LogIn,
  Phone,
  ChefHat,
  CalendarDays
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import Testimoni from "@/components/Testimoni"
import Image from "next/image"

export default function Home() {
  const features = [
    {
      icon: SlidersHorizontal,
      title: "Kustomisasi Menu",
      description:
        "Sesuaikan menu dengan preferensi diet, alergi, dan selera personal Anda.",
    },
    {
      icon: Truck,
      title: "Pengiriman Nasional",
      description:
        "Jangkauan pengiriman ke lebih dari 50 kota besar di Indonesia dengan sistem logistik yang terpercaya.",
    },
    {
      icon: BarChart3,
      title: "Informasi Nutrisi Lengkap",
      description:
        "Setiap hidangan dilengkapi dengan informasi nutrisi detail termasuk kalori, protein, karbohidrat, dan lemak.",
    },
    {
      icon: Shield,
      title: "Jaminan Kualitas",
      description:
        "Standar kebersihan dan keamanan pangan yang tinggi dengan sertifikasi HACCP dan halal MUI.",
    },
    {
      icon: Clock,
      title: "Pengiriman Tepat Waktu",
      description:
        "Sistem pengiriman yang efisien memastikan makanan sampai fresh dalam waktu yang telah dijadwalkan.",
    },
    {
      icon: ChefHat,
      title: "Chef Berpengalaman",
      description:
        "Dimasak langsung oleh chef profesional dengan standar rasa dan kualitas tinggi.",
    },
  ]
    

  return (
    <div className="bg-background text-foreground font-outfit">
      <section className="min-h-[90vh] flex items-center justify-center text-center bg-background">
        <div className="container mx-20 px-6 grid md:grid-cols-2 gap-6 items-center">
            {/* Text Content */}
            <div className="text-center md:text-left space-y-6">
            <div className="flex items-center justify-center md:justify-start mb-4">
                <div className="bg-primary p-4 rounded-full mr-4 shadow">
                <Utensils className="w-8 h-8 text-primary-foreground" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">SEA Catering</h1>
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold text-secondary">
                “Healthy Meals, Anytime, Anywhere”
            </h2>

            <p className="text-lg text-muted-foreground max-w-xl">
                Nikmati pengalaman kuliner sehat yang dapat disesuaikan dengan kebutuhan Anda. Kami menghadirkan makanan bergizi berkualitas tinggi langsung ke depan pintu Anda di seluruh Indonesia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href='/menu'>
                    <Button
                    size="lg"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-full shadow cursor-pointer"
                        >
                        Pesan Sekarang <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </Link>
                <a href='#features'>
                    <Button
                        variant="outline"
                        size="lg"
                        className="border border-primary text-primary hover:bg-primary/10 px-8 py-4 rounded-full cursor-pointer"
                        >
                        Layanan Kami
                    </Button>
                </a>
            </div>
            </div>

            {/* Image Section */}
            <div className="flex justify-center md:justify-end">
            <Image
                src="/assets/meal-img.jpg"
                alt="Makanan Lezat SEA Catering"
                className="rounded-2xl shadow-xl max-w-full max-h-[500px] object-cover"
            />
            </div>
        </div>
        </section>


      {/* About Section */}
      <section className="py-20 bg-card text-card-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Tentang SEA Catering</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-left">
                <p>
                  SEA Catering adalah layanan katering sehat yang dapat disesuaikan dengan kebutuhan personal Anda. Kami berkomitmen untuk menyediakan makanan bergizi tinggi yang tidak hanya lezat, tetapi juga mendukung gaya hidup sehat Anda.
                </p>
                <p>
                  Dengan jangkauan pengiriman ke seluruh kota besar di Indonesia, kami memastikan setiap hidangan sampai dalam kondisi segar dan siap dinikmati kapan saja, di mana saja.
                </p>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  <span>Menggunakan bahan-bahan segar dan berkualitas tinggi</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  <span>Menu yang dapat disesuaikan dengan preferensi diet</span>
                </div>
              </div>
              <div className="bg-muted p-8 rounded-2xl shadow">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                  <div className="text-muted-foreground mb-6">Pelanggan Puas</div>
                  <div className="text-4xl font-bold text-primary mb-2">50+</div>
                  <div className="text-muted-foreground mb-6">Kota Jangkauan</div>
                  <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-muted-foreground">Layanan Pelanggan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-10 bg-background" id='features'>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Mengapa Memilih SEA Catering?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Kami menyediakan layanan katering sehat terdepan dengan berbagai keunggulan yang mendukung gaya hidup sehat Anda
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card border-0 shadow hover:shadow-md transition hover:scale-[1.02]">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-lg font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Testimoni/>
        {/* CTA Section */}
    <section className="pt-20 pb-10 bg-primary text-primary-foreground">
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
            <Link href='/menu'>
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

    </div>
  )
}
