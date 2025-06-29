"use client"

import { Mail, Phone, MapPin, Facebook, Instagram, User } from "lucide-react"

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

          <div className="bg-card border border-border rounded-xl shadow p-6 hover:shadow-lg hover:scale-[1.02] transition-all">
            <h3 className="text-xl font-semibold text-primary mb-4">Ulas Layanan Kami!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Sudah pernah mencoba layanan kami? Bagikan pengalaman Anda!
            </p>
            <a 
              href="/rating" 
              className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              Beri Rating & Review
            </a>
          </div>
        </div>

        {/* Right: Info Grid */}
        <div className="grid grid-cols-1 gap-6 h-fit">
          <div className="bg-card border border-border rounded-xl shadow p-6 hover:shadow-lg hover:scale-[1.02] transition-all">
            <h3 className="text-xl font-semibold text-primary mb-4">Tim Kami</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <User className="w-5 h-5 text-primary" />
                <span className="text-base"><strong>Manager:</strong> Brian Wijaya</span>
              </div>
              <div className="flex items-center gap-4">
                <User className="w-5 h-5 text-primary" />
                <span className="text-base"><strong>Head Chef:</strong> Sari Indah</span>
              </div>
              <div className="flex items-center gap-4">
                <User className="w-5 h-5 text-primary" />
                <span className="text-base"><strong>Customer Service:</strong> Dina Kusuma</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl shadow p-6 hover:shadow-lg hover:scale-[1.02] transition-all">
            <h3 className="text-xl font-semibold text-primary mb-4">Jam Operasional</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Senin - Jumat</span>
                <span>08:00 - 20:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sabtu</span>
                <span>08:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Minggu</span>
                <span>10:00 - 16:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
    
  )
}