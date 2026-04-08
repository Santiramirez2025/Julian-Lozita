'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import ImageUploader from './ImageUploader'
import AIDescriptionGenerator from '@/components/ai/AIDescriptionGenerator'
import { Property, PropertyFormData } from '@/types'
import { slugify, formatPrice } from '@/lib/utils'
import { barriosVillaMaria, barriosVillaNueva } from '@/lib/barrios'

const propertyTypes = [
  { value: 'casa', label: 'Casa' },
  { value: 'departamento', label: 'Departamento' },
  { value: 'terreno', label: 'Terreno' },
  { value: 'local', label: 'Local comercial' },
  { value: 'galpon', label: 'Galpón' },
]

const statusOptions = [
  { value: 'available', label: 'Disponible' },
  { value: 'reserved', label: 'Reservada' },
  { value: 'sold', label: 'Vendida' },
]

const currencyOptions = [
  { value: 'USD', label: 'USD (Dólares)' },
  { value: 'ARS', label: 'ARS (Pesos)' },
]

const featureOptions = [
  'Pileta', 'Quincho', 'Patio', 'Jardín', 'Cochera', 'Gas natural',
  'Agua corriente', 'Cloacas', 'Asfalto', 'Balcón', 'Terraza',
  'Ascensor', 'Seguridad', 'Luminoso', 'Escritura inmediata',
  'Apto crédito', 'Calefacción', 'Aire acondicionado',
]

interface PropertyFormProps {
  property?: Property
}

// Safe int parse that preserves 0
const parseIntOrUndef = (val: string): number | undefined => {
  if (val === '') return undefined
  const n = parseInt(val, 10)
  return isNaN(n) ? undefined : n
}

const parseFloatOrUndef = (val: string): number | undefined => {
  if (val === '') return undefined
  const n = parseFloat(val)
  return isNaN(n) ? undefined : n
}

export default function PropertyForm({ property }: PropertyFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const isEditing = !!property

  const [form, setForm] = useState<PropertyFormData>({
    title: property?.title || '',
    description: property?.description || '',
    price: property?.price || 0,
    currency: property?.currency || 'USD',
    address: property?.address || '',
    neighborhood: property?.neighborhood || '',
    latitude: property?.latitude || undefined,
    longitude: property?.longitude || undefined,
    propertyType: property?.propertyType || 'casa',
    rooms: property?.rooms || undefined,
    bedrooms: property?.bedrooms || undefined,
    bathrooms: property?.bathrooms || undefined,
    garages: property?.garages || undefined,
    totalArea: property?.totalArea || undefined,
    coveredArea: property?.coveredArea || undefined,
    features: property?.features || [],
    images: property?.images || [],
    coverImage: property?.coverImage || '',
    status: property?.status || 'available',
    featured: property?.featured || false,
    published: property?.published ?? true,
    acceptsPermuta: property?.acceptsPermuta || false,
    hasFinancing: property?.hasFinancing || false,
    urgentSale: property?.urgentSale || false,
    negotiable: property?.negotiable ?? true,
    metaTitle: property?.metaTitle || '',
    metaDescription: property?.metaDescription || '',
  })

  const updateField = (key: keyof PropertyFormData, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setIsDirty(true)
  }

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !saving) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty, saving])

  const toggleFeature = (feature: string) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }))
    setIsDirty(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.price || !form.address || !form.neighborhood) {
      toast.error('Completá los campos obligatorios')
      return
    }
    if (form.images.length === 0 || !form.coverImage) {
      toast.error('Subí al menos una imagen')
      return
    }

    setSaving(true)

    try {
      const slug = isEditing ? property.slug : slugify(form.title)
      const payload = { ...form, slug }

      const url = isEditing ? `/api/propiedades/${property.id}` : '/api/propiedades'
      const method = isEditing ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Error al guardar')
      }

      setIsDirty(false)
      toast.success(isEditing ? 'Propiedad actualizada' : 'Propiedad creada')
      router.push('/admin/propiedades')
      router.refresh()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  const formattedPrice = form.price > 0 ? formatPrice(form.price, form.currency) : null

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Section: Información básica */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <path d="M9 22V12h6v10" />
            </svg>
          </div>
          <div>
            <h3 className="font-heading font-bold text-text">Información básica</h3>
            <p className="text-xs text-text-light">Datos principales de la propiedad</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Título *"
            value={form.title}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Casa 3 ambientes en Barrio Norte"
          />
          <Select
            label="Tipo de propiedad *"
            options={propertyTypes}
            value={form.propertyType}
            onChange={(e) => updateField('propertyType', e.target.value)}
          />
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                label="Precio *"
                type="number"
                value={form.price || ''}
                onChange={(e) => updateField('price', parseFloat(e.target.value) || 0)}
                placeholder="85000"
              />
              {formattedPrice && (
                <p className="text-xs text-primary font-mono mt-1.5">{formattedPrice}</p>
              )}
            </div>
            <div className="w-40">
              <Select
                label="Moneda"
                options={currencyOptions}
                value={form.currency}
                onChange={(e) => updateField('currency', e.target.value)}
              />
            </div>
          </div>
          <Select
            label="Estado"
            options={statusOptions}
            value={form.status}
            onChange={(e) => updateField('status', e.target.value)}
          />
        </div>
      </div>

      {/* Section: Ubicación */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div>
            <h3 className="font-heading font-bold text-text">Ubicación</h3>
            <p className="text-xs text-text-light">Dónde está la propiedad</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Dirección *"
            value={form.address}
            onChange={(e) => updateField('address', e.target.value)}
            placeholder="Av. Sabattini 1234"
          />
          <Select
            label="Barrio *"
            value={form.neighborhood}
            onChange={(e) => updateField('neighborhood', e.target.value)}
            options={[
              { value: '', label: 'Seleccioná un barrio' },
              ...barriosVillaMaria.map((b) => ({ value: b.name, label: `${b.name} — Villa María` })),
              ...barriosVillaNueva.map((b) => ({ value: b.name, label: `${b.name} — Villa Nueva` })),
            ]}
          />
          <Input
            label="Latitud"
            type="number"
            step="any"
            value={form.latitude ?? ''}
            onChange={(e) => updateField('latitude', parseFloatOrUndef(e.target.value))}
            placeholder="-32.4073"
          />
          <Input
            label="Longitud"
            type="number"
            step="any"
            value={form.longitude ?? ''}
            onChange={(e) => updateField('longitude', parseFloatOrUndef(e.target.value))}
            placeholder="-63.2408"
          />
        </div>
        <p className="text-xs text-text-light mt-3 flex items-start gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          Para obtener latitud/longitud: abrí Google Maps, click derecho en la ubicación y copiá los números que aparecen.
        </p>
      </div>

      {/* Section: Características */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 3v18" />
            </svg>
          </div>
          <div>
            <h3 className="font-heading font-bold text-text">Características</h3>
            <p className="text-xs text-text-light">Ambientes, m² y detalles</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Input label="Ambientes" type="number" value={form.rooms ?? ''} onChange={(e) => updateField('rooms', parseIntOrUndef(e.target.value))} />
          <Input label="Dormitorios" type="number" value={form.bedrooms ?? ''} onChange={(e) => updateField('bedrooms', parseIntOrUndef(e.target.value))} />
          <Input label="Baños" type="number" value={form.bathrooms ?? ''} onChange={(e) => updateField('bathrooms', parseIntOrUndef(e.target.value))} />
          <Input label="Cocheras" type="number" value={form.garages ?? ''} onChange={(e) => updateField('garages', parseIntOrUndef(e.target.value))} />
          <Input label="m² totales" type="number" value={form.totalArea ?? ''} onChange={(e) => updateField('totalArea', parseFloatOrUndef(e.target.value))} />
          <Input label="m² cubiertos" type="number" value={form.coveredArea ?? ''} onChange={(e) => updateField('coveredArea', parseFloatOrUndef(e.target.value))} />
        </div>
      </div>

      {/* Section: Extras */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <h3 className="font-heading font-bold text-text">Extras</h3>
              <p className="text-xs text-text-light">{form.features.length} seleccionados</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {featureOptions.map((feature) => {
            const selected = form.features.includes(feature)
            return (
              <button
                key={feature}
                type="button"
                onClick={() => toggleFeature(feature)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                  selected
                    ? 'bg-primary text-white shadow-sm shadow-primary/20'
                    : 'bg-bg text-text-light hover:bg-gray-100 border border-border'
                }`}
              >
                {selected && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
                {feature}
              </button>
            )
          })}
        </div>
      </div>

      {/* Section: Descripción + AI */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                <line x1="17" y1="10" x2="3" y2="10" />
                <line x1="21" y1="6" x2="3" y2="6" />
                <line x1="21" y1="14" x2="3" y2="14" />
                <line x1="17" y1="18" x2="3" y2="18" />
              </svg>
            </div>
            <div>
              <h3 className="font-heading font-bold text-text">Descripción</h3>
              <p className="text-xs text-text-light">{form.description.length} caracteres</p>
            </div>
          </div>
          <AIDescriptionGenerator
            propertyData={{
              propertyType: form.propertyType,
              neighborhood: form.neighborhood,
              rooms: form.rooms,
              bedrooms: form.bedrooms,
              bathrooms: form.bathrooms,
              totalArea: form.totalArea,
              coveredArea: form.coveredArea,
              features: form.features,
              price: form.price,
              currency: form.currency,
            }}
            onGenerated={(result) => {
              updateField('description', result.description)
              updateField('metaTitle', result.metaTitle)
              updateField('metaDescription', result.metaDescription)
              toast.success('Descripción generada con IA')
            }}
          />
        </div>
        <textarea
          value={form.description}
          onChange={(e) => updateField('description', e.target.value)}
          rows={6}
          className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text placeholder:text-text-light/60 focus:border-primary-light focus:ring-2 focus:ring-primary-light/10 transition-all"
          placeholder="Describí la propiedad..."
        />
      </div>

      {/* Section: Imágenes */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
          <div>
            <h3 className="font-heading font-bold text-text">Imágenes</h3>
            <p className="text-xs text-text-light">Las fotos venden la propiedad</p>
          </div>
        </div>
        <ImageUploader
          images={form.images}
          coverImage={form.coverImage}
          onImagesChange={(imgs) => updateField('images', imgs)}
          onCoverChange={(cover) => updateField('coverImage', cover)}
        />
      </div>

      {/* Section: SEO */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
          <div>
            <h3 className="font-heading font-bold text-text">SEO</h3>
            <p className="text-xs text-text-light">Para que aparezca en Google</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <Input
              label="Meta título"
              value={form.metaTitle || ''}
              onChange={(e) => updateField('metaTitle', e.target.value)}
              maxLength={60}
              placeholder="Se genera automático con IA"
            />
            <div className="flex justify-end mt-1">
              <span className={`text-xs ${(form.metaTitle?.length || 0) > 55 ? 'text-amber-600' : 'text-text-light'}`}>
                {form.metaTitle?.length || 0}/60
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Meta descripción</label>
            <textarea
              value={form.metaDescription || ''}
              onChange={(e) => updateField('metaDescription', e.target.value)}
              maxLength={155}
              rows={2}
              className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text placeholder:text-text-light/60 focus:border-primary-light focus:ring-2 focus:ring-primary-light/10 transition-all text-sm"
              placeholder="Se genera automático con IA"
            />
            <div className="flex justify-end mt-1">
              <span className={`text-xs ${(form.metaDescription?.length || 0) > 145 ? 'text-amber-600' : 'text-text-light'}`}>
                {form.metaDescription?.length || 0}/155
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Opciones */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
          </div>
          <div>
            <h3 className="font-heading font-bold text-text">Opciones</h3>
            <p className="text-xs text-text-light">Visibilidad y badges comerciales</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { key: 'featured' as const, label: 'Destacada', desc: 'Aparece en la home' },
            { key: 'published' as const, label: 'Publicada', desc: 'Visible al público' },
            { key: 'acceptsPermuta' as const, label: 'Acepta permuta', desc: 'Badge en la card' },
            { key: 'hasFinancing' as const, label: 'Financiación', desc: 'Posibilidad de cuotas' },
            { key: 'urgentSale' as const, label: 'Venta urgente', desc: 'Marca de oportunidad' },
            { key: 'negotiable' as const, label: 'Precio negociable', desc: 'Acepta ofertas' },
          ].map((opt) => (
            <label
              key={opt.key}
              className={`flex items-start gap-3 cursor-pointer p-3.5 rounded-xl border transition-all ${
                form[opt.key]
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/30 hover:bg-bg'
              }`}
            >
              <input
                type="checkbox"
                checked={form[opt.key] as boolean}
                onChange={(e) => updateField(opt.key, e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary mt-0.5 shrink-0"
              />
              <div className="min-w-0">
                <span className="text-sm font-semibold text-text block">{opt.label}</span>
                <span className="text-xs text-text-light">{opt.desc}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Sticky submit bar */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur-xl border-t border-border -mx-6 px-6 py-4 lg:-mx-8 lg:px-8 flex items-center justify-between gap-4 z-10">
        <div className="text-sm text-text-light hidden sm:block">
          {isDirty ? (
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Cambios sin guardar
            </span>
          ) : isEditing ? (
            <span>Sin cambios</span>
          ) : null}
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <Button type="button" variant="ghost" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" loading={saving} size="lg">
            {isEditing ? 'Guardar cambios' : 'Crear propiedad'}
          </Button>
        </div>
      </div>
    </form>
  )
}
