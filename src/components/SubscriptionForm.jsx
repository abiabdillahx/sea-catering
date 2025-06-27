"use client"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Check, ShoppingCart } from "lucide-react"

const MEAL_TYPES = [
  { value: 'BREAKFAST', label: 'Sarapan' },
  { value: 'LUNCH', label: 'Makan Siang' },
  { value: 'DINNER', label: 'Makan Malam' }
]

const DELIVERY_DAYS = [
  { value: 'MONDAY', label: 'Senin' },
  { value: 'TUESDAY', label: 'Selasa' },
  { value: 'WEDNESDAY', label: 'Rabu' },
  { value: 'THURSDAY', label: 'Kamis' },
  { value: 'FRIDAY', label: 'Jumat' },
  { value: 'SATURDAY', label: 'Sabtu' },
  { value: 'SUNDAY', label: 'Minggu' }
]

export default function SubscriptionForm() {
  const [mealPlans, setMealPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  
  // Form state
  const [formData, setFormData] = useState({
    planId: '',
    phone: '',
    mealTypes: [],
    deliveryDays: [],
    allergies: ''
  })
  
  const { data: session, status } = useSession()
  const router = useRouter()

  // Redirect jika belum login
  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      router.push('/login?callbackUrl=/subscription')
    }
  }, [session, status, router])

  // Fetch meal plans
  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const response = await fetch('/api/meal-plans')
        const data = await response.json()
        
        if (data.success) {
          setMealPlans(data.data)
        }
      } catch (error) {
        console.error('Error fetching meal plans:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchMealPlans()
  }, [])

  // Calculate total price
  const calculateTotalPrice = () => {
    const selectedPlan = mealPlans.find(plan => plan.id === formData.planId)
    if (!selectedPlan || formData.mealTypes.length === 0 || formData.deliveryDays.length === 0) {
      return 0
    }
    
    return selectedPlan.price * formData.mealTypes.length * formData.deliveryDays.length * 4.3
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handleMultiSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
    // Clear error when user makes selection
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.planId) {
      newErrors.planId = 'Pilih paket makanan'
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Nomor telepon wajib diisi'
    } else if (!/^(\+?62|0)[0-9]{8,12}$/.test(formData.phone)) {
      newErrors.phone = 'Format nomor telepon tidak valid'
    }
    
    if (formData.mealTypes.length === 0) {
      newErrors.mealTypes = 'Pilih minimal satu jenis makanan'
    }
    
    if (formData.deliveryDays.length === 0) {
      newErrors.deliveryDays = 'Pilih minimal satu hari pengiriman'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!validateForm()) {
      return
    }
    
    setSubmitting(true)
    setErrors({})
    
    try {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          totalPrice: calculateTotalPrice()
        }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setSuccess(true)
        // Reset form
        setFormData({
          planId: '',
          phone: '',
          mealTypes: [],
          deliveryDays: [],
          allergies: ''
        })
        
        // Redirect to success page after 2 seconds
        setTimeout(() => {
          router.push('/subscription/success')
        }, 2000)
      } else {
        setErrors({ submit: data.message || 'Terjadi kesalahan saat memproses langganan' })
      }
    } catch (error) {
      console.error('Error submitting subscription:', error)
      setErrors({ submit: 'Terjadi kesalahan jaringan. Silakan coba lagi.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Check className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Langganan Berhasil!</h2>
            <p className="text-gray-600">
              Terima kasih telah berlangganan. Kami akan menghubungi Anda segera.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Formulir Langganan
          </CardTitle>
          <CardDescription>
            Lengkapi informasi di bawah untuk memulai langganan makanan sehat Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Meal Plan Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Pilih Paket Makanan *
              </label>
              <div className="grid gap-3">
                {mealPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      formData.planId === plan.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleInputChange('planId', plan.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{plan.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">
                          Rp {plan.price.toLocaleString('id-ID')}
                        </p>
                        <p className="text-xs text-gray-500">per porsi</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.planId && <p className="text-red-500 text-sm mt-1">{errors.planId}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Nomor Telepon *
              </label>
              <Input
                type="tel"
                placeholder="08xxxxxxxxxx"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Meal Types */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Jenis Makanan *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {MEAL_TYPES.map((type) => (
                  <Button
                    key={type.value}
                    type="button"
                    variant={formData.mealTypes.includes(type.value) ? "default" : "outline"}
                    onClick={() => handleMultiSelect('mealTypes', type.value)}
                    className="justify-center"
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
              {errors.mealTypes && <p className="text-red-500 text-sm mt-1">{errors.mealTypes}</p>}
            </div>

            {/* Delivery Days */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Hari Pengiriman *
              </label>
              <div className="grid grid-cols-4 gap-2">
                {DELIVERY_DAYS.map((day) => (
                  <Button
                    key={day.value}
                    type="button"
                    variant={formData.deliveryDays.includes(day.value) ? "default" : "outline"}
                    onClick={() => handleMultiSelect('deliveryDays', day.value)}
                    className="justify-center text-xs"
                  >
                    {day.label}
                  </Button>
                ))}
              </div>
              {errors.deliveryDays && <p className="text-red-500 text-sm mt-1">{errors.deliveryDays}</p>}
            </div>

            {/* Allergies */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Alergi Makanan (Opsional)
              </label>
              <Textarea
                placeholder="Tuliskan alergi makanan atau pantangan diet Anda..."
                value={formData.allergies}
                onChange={(e) => handleInputChange('allergies', e.target.value)}
                rows={3}
              />
            </div>

            {/* Price Summary */}
            {calculateTotalPrice() > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Ringkasan Harga</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Jenis makanan:</span>
                    <span>{formData.mealTypes.length} jenis</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hari pengiriman:</span>
                    <span>{formData.deliveryDays.length} hari/minggu</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimasi per bulan:</span>
                    <span>~{Math.round(formData.mealTypes.length * formData.deliveryDays.length * 4.3)} porsi</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total per bulan:</span>
                      <span>Rp {calculateTotalPrice().toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div>
              {errors.submit && (
                <p className="text-red-500 text-sm mb-3">{errors.submit}</p>
              )}
              <Button
                type="submit"
                className="w-full"
                disabled={submitting || calculateTotalPrice() === 0}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  'Mulai Langganan'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}