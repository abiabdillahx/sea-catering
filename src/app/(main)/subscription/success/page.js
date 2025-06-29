"use client"
import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Home, Phone, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function SubscriptionSuccessPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === "loading") return
    if (!session) {
      router.push('/login?callbackUrl=/subscription')
    }
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Success Card */}
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-green-800 mb-2">
                Langganan Berhasil!
              </h1>
              <p className="text-green-700 mb-4">
                Terima kasih telah berlangganan makanan sehat kami
              </p>
              <div className="bg-white rounded-lg p-4 text-left max-w-md mx-auto">
                <h3 className="font-semibold text-gray-800 mb-2">Detail Langganan:</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Nama:</span> {session.user?.name}</p>
                  <p><span className="font-medium">Status:</span> <span className="text-green-600 font-medium">Aktif</span></p>
                  <p><span className="font-medium">Tanggal:</span> {new Date().toLocaleDateString('id-ID')}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What's Next Card */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Apa yang Selanjutnya?</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-blue-50">
                <Phone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-medium text-blue-800 mb-1">Konfirmasi</h3>
                <p className="text-sm text-blue-600">
                  Tim kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi
                </p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-purple-50">
                <MessageCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-medium text-purple-800 mb-1">Konsultasi</h3>
                <p className="text-sm text-purple-600">
                  Diskusi menu dan jadwal pengiriman sesuai kebutuhan Anda
                </p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-green-50">
                <Check className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-medium text-green-800 mb-1">Pengiriman</h3>
                <p className="text-sm text-green-600">
                  Makanan segar akan dikirim sesuai jadwal yang telah ditentukan
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold mb-2">Butuh Bantuan?</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Hubungi customer service kami jika ada pertanyaan
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center items-center text-sm">
              <span className="font-medium">WhatsApp:</span>
              <a href="https://wa.me/628123456789" className="text-primary hover:underline">
                +62 812-3456-789
              </a>
              <span className="hidden sm:inline">|</span>
              <span className="font-medium">Email:</span>
              <a href="mailto:support@seacatering.com" className="text-primary hover:underline">
                support@seacatering.com
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" className="flex-1 sm:flex-none">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Kembali ke Beranda
            </Link>
          </Button>
          <Button asChild className="flex-1 sm:flex-none">
            <Link href="/subscription">
              Lihat Paket Lainnya
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}