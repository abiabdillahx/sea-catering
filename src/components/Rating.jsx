"use client"

import { useState } from "react"
import { Send, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"

export default function RatingForm() {
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState("")
  const { data: session } = useSession()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!message || rating === 0) {
      toast.error("Mohon isi pesan dan rating.")
      return
    }

    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        rating,
      }),
    })

    const data = await res.json()
    if (!res.ok) return toast.error(data.error || "Gagal mengirim.")
    toast.success("Testimoni terkirim!")
    setMessage("")
    setRating(0)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card p-8 rounded-xl shadow-md space-y-6 border border-border max-w-xl"
    >
      <h1 className="text-4xl font-bold text-primary">Bagikan pengalamanmu!</h1>

      {/* Pesan */}
      <div>
        <label className="block text-sm font-medium mb-1">Pesan</label>
        <Textarea
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tulis pesan Anda..."
          required
        />
      </div>

      {/* Rating */}
      <div>
        <label className="block text-sm font-medium mb-2">Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-7 h-7 cursor-pointer ${
                rating >= star ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full flex gap-2 items-center justify-center"
      >
        <Send className="w-5 h-5" /> Kirim Rating
      </Button>
    </form>
  )
}
