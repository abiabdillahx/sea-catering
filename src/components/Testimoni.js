'use client'
import Image from "next/image"
import { Star } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"

const testimonials = [
  {
    name: "Sarah Wijaya",
    role: "Ibu Rumah Tangga",
    photo: "/avatars/avatar1.jpg",
    review: "SEA Catering selalu jadi andalan. Makanan sehat, pengiriman tepat waktu, dan anak-anak pun suka!",
    rating: 5
  },
  {
    name: "Andi Pratama",
    role: "Karyawan Swasta",
    photo: "/avatars/avatar2.jpg",
    review: "Langganan makan siang kantor. Favoritku ayam lada hitam! Praktis & bergizi.",
    rating: 5
  },
  {
    name: "Rina Kurniawan",
    role: "Instruktur Yoga",
    photo: "/avatars/avatar3.jpg",
    review: "Suka banget karena bisa kustom diet keto! Worth it bgt sih SEA Catering.",
    rating: 4
  },
  {
    name: "Teguh Santoso",
    role: "Wedding Organizer",
    photo: "/avatars/avatar4.jpg",
    review: "SEA Catering selalu jadi partner kami untuk acara. Tamu puas, kami juga senang!",
    rating: 5
  },
]

export default function Testimoni() {
  return (
    <section className="py-20 bg-accent/40">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
          Kata Mereka Tentang SEA Catering
        </h2>
        <div className="overflow-hidden relative">
          <div className="flex space-x-6 animate-scroll-left w-max">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="min-w-[300px] max-w-xs bg-card border border-border p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src={t.photo}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-3 italic">
                  “{t.review}”
                </p>
                <div className="flex gap-1 text-yellow-400">
                  {Array.from({ length: t.rating }, (_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 grid justify-items-center">
            <Link href='/rating'>
                <Button className='rounded-full cursor-pointer hover:bg-primary/80'>
                    <Star/> Rate us here
                </Button>
            </Link>

          </div>
        </div>
      </div>
    </section>
  )
}
