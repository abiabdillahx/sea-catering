"use client"

import { useState } from "react"
import { Send, Star, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function RatingForm() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const { data: session, status } = useSession()
  const router = useRouter()

  // Redirect jika belum login
  if (status === "loading") {
    return <div className="flex justify-center items-center p-8">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  }

  if (!session) {
    router.push('/login')
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (rating === 0) {
      alert('Silakan pilih rating terlebih dahulu')
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message.trim(),
          rating
        })
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
        setMessage("")
        setRating(0)
        setTimeout(() => {
          router.push('/')
        }, 2000)
      } else {
        alert(data.error || 'Terjadi kesalahan')
      }
    } catch (error) {
      console.error('Error submitting testimonial:', error)
      alert('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-card p-8 rounded-xl shadow-md max-w-xl text-center">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h2 className="text-2xl font-bold text-primary mb-2">Terima Kasih!</h2>
        <p className="text-muted-foreground">Rating Anda telah berhasil dikirim. Anda akan diarahkan ke beranda...</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card p-8 rounded-xl shadow-md space-y-6 border border-border max-w-xl"
    >
      <h1 className="text-4xl font-bold text-primary">Bagikan pengalamanmu!</h1>
      
      <div className="bg-accent/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          Hai <span className="font-semibold text-foreground">{session.user.name}</span>! 
          Kami senang mendengar pendapat Anda tentang layanan SEA Catering.
        </p>
      </div>

      {/* Pesan */}
      <div>
        <label className="block text-sm font-medium mb-1">Pesan</label>
        <Textarea 
          rows={5} 
          placeholder="Tulis pesan Anda..." 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required 
        />
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
        {rating > 0 && (
          <p className="text-sm text-muted-foreground mt-1">
            Rating: {rating} dari 5 bintang
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading || rating === 0}
        className="w-full flex gap-2 items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Send className="w-5 h-5" />
        )}
        {isLoading ? 'Mengirim...' : 'Kirim Rating'}
      </Button>
    </form>
  )
}