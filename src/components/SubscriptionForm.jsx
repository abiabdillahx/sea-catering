"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Check, ShoppingCart, X } from "lucide-react"
import mealPlans from "../app/data/mealPlans"

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

export default function SubscriptionForm({ preSelectedPlan, userData }) {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  
  // Form state
  const [formData, setFormData] = useState({
    planId: preSelectedPlan?.id || '',
    name: userData?.name || '',
    phone: userData?.phone || '',
    mealTypes: [],
    deliveryDays: [],
    allergies: ''
  })
  
  const router = useRouter()

  // Update form when preSelectedPlan changes
  useEffect(() => {
    if (preSelectedPlan) {
      setFormData(prev => ({
        ...prev,
        planId: preSelectedPlan.id
      }))
    }
  }, [preSelectedPlan])

  // Auto-fill user data
  useEffect(() => {
    if (userData) {
      setFormData(prev => ({
        ...prev,
        name: userData.name || '',
        phone: userData.phone || ''
      }))
    }
  }, [userData])

  // Calculate total price
  const calculateTotalPrice = () => {
    const selectedPlan = mealPlans.find(plan => plan.id === formData.planId)
    if (!selectedPlan || formData.mealTypes.length === 0 || formData.deliveryDays.length === 0) {
      return 0
    }
    
    return selectedPlan.price * formData.mealTypes.length * formData.deliveryDays.length * 4.3
  }

  const getSelectedPlan = () => {
    return mealPlans.find(plan => plan.id === formData.planId)
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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nama wajib diisi'
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
          totalPrice: Math.round(calculateTotalPrice())
        }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setSuccess(true)
        // Reset form
        setFormData({
          planId: '',
          name: userData?.name || '',
          phone: userData?.phone || '',
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

  if (success) {
    return (
      <div className="flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Check className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Langganan Berhasil!</h2>
            <p className="text-muted-foreground">
              Terima kasih telah berlangganan. Kami akan menghubungi Anda segera.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
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
          {/* Selected Plan Display */}
          {formData.planId && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-primary">Paket Terpilih</h3>
                  <p className="text-sm text-muted-foreground">{getSelectedPlan()?.name}</p>
                  <p className="text-sm font-medium">Rp {getSelectedPlan()?.price?.toLocaleString('id-ID')} / porsi</p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleInputChange('planId', '')}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Meal Plan Selection */}
          {!formData.planId && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Pilih Paket Makanan *
              </label>
              <div className="grid gap-3">
                {mealPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors hover:border-primary/50`}
                    onClick={() => handleInputChange('planId', plan.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">
                          Rp {plan.price.toLocaleString('id-ID')}
                        </p>
                        <p className="text-xs text-muted-foreground">per porsi</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.planId && <p className="text-destructive text-sm mt-1">{errors.planId}</p>}
            </div>
          )}

          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Nama Lengkap *
              </label>
              <Input
                type="text"
                placeholder="Masukkan nama lengkap"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
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
                className={errors.phone ? 'border-destructive' : ''}
              />
              {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Meal Types */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Jenis Makanan *
            </label>
            <div className="flex flex-wrap gap-2">
              {MEAL_TYPES.map((type) => (
                <Button
                  key={type.value}
                  type="button"
                  variant={formData.mealTypes.includes(type.value) ? "default" : "outline"}
                  onClick={() => handleMultiSelect('mealTypes', type.value)}
                  className="flex-1 min-w-[120px]"
                >
                  {type.label}
                </Button>
              ))}
            </div>
            {errors.mealTypes && <p className="text-destructive text-sm mt-1">{errors.mealTypes}</p>}
          </div>

          {/* Delivery Days */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Hari Pengiriman *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {DELIVERY_DAYS.map((day) => (
                <Button
                  key={day.value}
                  type="button"
                  variant={formData.deliveryDays.includes(day.value) ? "default" : "outline"}
                  onClick={() => handleMultiSelect('deliveryDays', day.value)}
                  className="justify-center text-sm"
                >
                  {day.label}
                </Button>
              ))}
            </div>
            {errors.deliveryDays && <p className="text-destructive text-sm mt-1">{errors.deliveryDays}</p>}
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
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium mb-3">Ringkasan Pesanan</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Paket:</span>
                  <span className="font-medium">{getSelectedPlan()?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Jenis makanan:</span>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {formData.mealTypes.map(type => (
                      <Badge key={type} variant="secondary" className="text-xs">
                        {MEAL_TYPES.find(t => t.value === type)?.label}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Hari pengiriman:</span>
                  <span>{formData.deliveryDays.length} hari/minggu</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimasi per bulan:</span>
                  <span>~{Math.round(formData.mealTypes.length * formData.deliveryDays.length * 4.3)} porsi</span>
                </div>
                <div className="border-t pt-2 mt-3">
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total per bulan:</span>
                    <span className="text-primary">Rp {Math.round(calculateTotalPrice()).toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div>
            {errors.submit && (
              <p className="text-destructive text-sm mb-3">{errors.submit}</p>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={submitting || calculateTotalPrice() === 0}
              size="lg"
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
  )
}