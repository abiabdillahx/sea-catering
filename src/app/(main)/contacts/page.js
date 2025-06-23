"use client"

import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react"
import RatingForm from "@/components/Rating"

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20 px-6 md:px-16 bg-background text-foreground font-outfit">
      {/* Heading */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-primary">Hubungi Kami & Beri Penilaian</h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-xl mx-auto">
          Punya pertanyaan, saran, atau sekadar ingin memberikan rating? Kami selalu terbuka!
        </p>
      </div>

        
      {/* Grid Layout */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Right: Rating Form */}
        <div className="self-start">
          <RatingForm />
        </div>
        {/* Left: Info Kontak */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl shadow p-6 space-y-4 hover:shadow-lg hover:scale-[1.02] transition-all">
            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-primary" />
              <span className="text-base">+62 812 3456 789</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-primary" />
              <a href="mailto:hello@seacatering.com" className="text-base">hello@seacatering.com</a>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-primary" />
              <span className="text-base">Jl. Sehat No. 123, Jakarta</span>
            </div>
            <div className="flex items-center gap-4">
              <Instagram className="w-6 h-6 text-primary" />
              <a href="https://instagram.com/abiabdillahx" className="text-base">@seacatering</a>
            </div>
            <div className="flex items-center gap-4">
              <Facebook className="w-6 h-6 text-primary" />
              <a href="https://facebook.com/" className="text-base">SEA Catering</a>
            </div>
          </div>
        </div>

        
      </div>

      {/* Divider */}
      <div className="border-t border-border my-20"></div>

      {/* Footer CTA */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-primary">Kami Menantikan Feedback Anda!</h2>
        <p className="text-muted-foreground">
          Setiap ulasan dan saran akan membantu kami menjadi lebih baik.
        </p>
      </div>
    </div>
  )
}
