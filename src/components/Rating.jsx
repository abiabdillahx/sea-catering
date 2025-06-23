"use client"

import { useState } from "react"
import { Send, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function RatingForm() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Proses form di sini (POST ke API, Supabase, dsb)
    alert(`Rating: ${rating} bintang`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card p-8 rounded-xl shadow-md space-y-6 border border-border max-w-xl"
    >
      <h1 className="text-4xl font-bold text-primary">Bagikan pengalamanmu!</h1>

      {/* Nama */}
      <div>
        <label className="block text-sm font-medium mb-1">Nama</label>
        <Input type="text" placeholder="Nama lengkap" required />
      </div>

      {/* Pesan */}
      <div>
        <label className="block text-sm font-medium mb-1">Pesan</label>
        <Textarea rows={5} placeholder="Tulis pesan Anda..." required />
      </div>

      {/* Rating bintang */}
      <div>
        <label className="block text-sm font-medium mb-2">Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-7 h-7 cursor-pointer transition-colors ${
                (hover || rating) >= star ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
              }`}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full flex gap-2 items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <Send className="w-5 h-5" />
        Kirim Rating
      </Button>
    </form>
  )
}
