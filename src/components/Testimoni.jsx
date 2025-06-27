'use client'
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import { useKeenSlider } from "keen-slider/react"
import { useEffect, useRef, useState } from "react"

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
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2, spacing: 20 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 24 },
      },
    },
  })

  const timerRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (!slider.current) return
    timerRef.current = setInterval(() => {
      slider.current?.next()
    }, 3000)

    return () => clearInterval(timerRef.current)
  }, [slider])

  const pauseAutoScroll = () => clearInterval(timerRef.current)
  const resumeAutoScroll = () => {
    timerRef.current = setInterval(() => slider.current?.next(), 3000)
  }

  return (
    <section className="py-20 bg-accent/40">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
          Kata Mereka Tentang SEA Catering
        </h2>

        <div
          onMouseEnter={() => {
            pauseAutoScroll()
            setHovered(true)
          }}
          onMouseLeave={() => {
            resumeAutoScroll()
            setHovered(false)
          }}
          className="relative"
        >
          <div ref={sliderRef} className="keen-slider">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="keen-slider__slide min-w-[300px] bg-card border border-border p-6 rounded-lg shadow-sm"
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

          {/* Controls */}
          {hovered && (
            <>
              <button
                onClick={() => slider.current?.prev()}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground p-2 rounded-full shadow hover:bg-primary/90 transition"
              >
                <ChevronLeft className="w-5 h-5 cursor-pointer" />
              </button>
              <button
                onClick={() => slider.current?.next()}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground p-2 rounded-full shadow hover:bg-primary/90 transition"
              >
                <ChevronRight className="w-5 h-5 cursor-pointer" />
              </button>
            </>
          )}
        </div>

        <div className="mt-10 grid justify-items-center">
          <Link href='/contacts'>
            <Button className='rounded-full cursor-pointer hover:bg-primary/80'>
              <Star className="mr-2 w-4 h-4" /> Rate us here
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

