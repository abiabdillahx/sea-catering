'use client'
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import { useKeenSlider } from "keen-slider/react"
import { useEffect, useRef, useState } from "react"

// Fallback testimonials jika API error atau belum ada data
const fallbackTestimonials = [
  {
    user: { name: "Sarah Wijaya", image: "/avatars/avatar1.jpg" },
    message: "SEA Catering selalu jadi andalan. Makanan sehat, pengiriman tepat waktu, dan anak-anak pun suka!",
    rating: 5
  },
  {
    user: { name: "Andi Pratama", image: "/avatars/avatar2.jpg" },
    message: "Langganan makan siang kantor. Favoritku ayam lada hitam! Praktis & bergizi.",
    rating: 5
  },
  {
    user: { name: "Rina Kurniawan", image: "/avatars/avatar3.jpg" },
    message: "Suka banget karena bisa kustom diet keto! Worth it bgt sih SEA Catering.",
    rating: 4
  },
  {
    user: { name: "Teguh Santoso", image: "/avatars/avatar4.jpg" },
    message: "SEA Catering selalu jadi partner kami untuk acara. Tamu puas, kami juga senang!",
    rating: 5
  },
]

export default function Testimoni() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
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

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials')
        const data = await response.json()
        
        if (data.success && data.data.length > 0) {
          setTestimonials(data.data)
        } else {
          // Jika API sukses tapi tidak ada data, gunakan fallback
          setTestimonials(fallbackTestimonials)
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err)
        setError(err.message)
        // Gunakan fallback testimonials jika API error
        setTestimonials(fallbackTestimonials)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  // Auto-scroll functionality
  useEffect(() => {
    if (!slider.current || testimonials.length === 0) return
    
    timerRef.current = setInterval(() => {
      slider.current?.next()
    }, 3000)
    
    return () => clearInterval(timerRef.current)
  }, [slider, testimonials])

  const pauseAutoScroll = () => clearInterval(timerRef.current)
  const resumeAutoScroll = () => {
    timerRef.current = setInterval(() => slider.current?.next(), 3000)
  }

  if (loading) {
    return (
      <section className="py-20 bg-accent/40">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
            Kata Mereka Tentang SEA Catering
          </h2>
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-accent/40">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
          Kata Mereka Tentang SEA Catering
        </h2>
        
        {error && (
          <div className="text-center mb-6 p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
            <p className="text-yellow-800">
              Menampilkan testimonial contoh karena: {error}
            </p>
          </div>
        )}
        
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
            {testimonials.map((testimonial, i) => (
              <div
                key={testimonial.id || i}
                className="keen-slider__slide min-w-[300px] bg-card border border-border p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src={testimonial.user?.image || "/avatar-default.png"}
                    alt={testimonial.user?.name || "Anonymous"}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.user?.name || "Anonymous"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(testimonial.createdAt).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-3 italic">
                  "{testimonial.message}"
                </p>
                <div className="flex gap-1 text-yellow-400">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  {Array.from({ length: 5 - testimonial.rating }, (_, i) => (
                    <Star key={i + testimonial.rating} className="w-4 h-4 text-muted-foreground/30" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Controls */}
          {hovered && testimonials.length > 1 && (
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
          <Link href='/rating'>
            <Button className='rounded-full cursor-pointer hover:bg-primary/80'>
              <Star className="mr-2 w-4 h-4" /> Rate us here
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}