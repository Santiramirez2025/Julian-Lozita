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
import { slugify } from '@/lib/utils'

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

export default function PropertyForm({ property }: PropertyFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
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
    metaTitle: property?.metaTitle || undefined,
    metaDescription: property?.metaDescription || undefined,
  })

  const updateField = (key: keyof PropertyFormData, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const toggleFeature = (feature: string) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }))
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

      toast.success(isEditing ? 'Propiedad actualizada' : 'Propiedad creada')
      router.push('/admin/propiedades')
      router.refresh()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic info */}
      <section>
        <h3 className="font-heading font-bold text-lg text-text mb-4">Información básica</h3>
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
      </section>

      {/* Location */}
      <section>
        <h3 className="font-heading font-bold text-lg text-text mb-4">Ubicación</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Dirección *"
            value={form.address}
            onChange={(e) => updateField('address', e.target.value)}
            placeholder="Av. Sabattini 1234"
          />
          <Input
            label="Barrio *"
            value={form.neighborhood}
            onChange={(e) => updateField('neighborhood', e.target.value)}
            placeholder="Barrio Norte"
          />
          <Input
            label="Latitud"
            type="number"
            step="any"
            value={form.latitude || ''}
            onChange={(e) => updateField('latitude', parseFloat(e.target.value) || undefined)}
            placeholder="-32.4073"
          />
          <Input
            label="Longitud"
            type="number"
            step="any"
            value={form.longitude || ''}
            onChange={(e) => updateField('longitude', parseFloat(e.target.value) || undefined)}
            placeholder="-63.2408"
          />
        </div>
      </section>

      {/* Characteristics */}
      <section>
        <h3 className="font-heading font-bold text-lg text-text mb-4">Características</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Input label="Ambientes" type="number" value={form.rooms || ''} onChange={(e) => updateField('rooms', parseInt(e.target.value) || undefined)} />
          <Input label="Dormitorios" type="number" value={form.bedrooms || ''} onChange={(e) => updateField('bedrooms', parseInt(e.target.value) || undefined)} />
          <Input label="Baños" type="number" value={form.bathrooms || ''} onChange={(e) => updateField('bathrooms', parseInt(e.target.value) || undefined)} />
          <Input label="Cocheras" type="number" value={form.garages || ''} onChange={(e) => updateField('garages', parseInt(e.target.value) || undefined)} />
          <Input label="m² totales" type="number" value={form.totalArea || ''} onChange={(e) => updateField('totalArea', parseFloat(e.target.value) || undefined)} />
          <Input label="m² cubiertos" type="number" value={form.coveredArea || ''} onChange={(e) => updateField('coveredArea', parseFloat(e.target.value) || undefined)} />
        </div>
      </section>

      {/* Features */}
      <section>
        <h3 className="font-heading font-bold text-lg text-text mb-4">Extras</h3>
        <div className="flex flex-wrap gap-2">
          {featureOptions.map((feature) => (
            <button
              key={feature}
              type="button"
              onClick={() => toggleFeature(feature)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                form.features.includes(feature)
                  ? 'bg-primary text-white'
                  : 'bg-gray-50 text-text-light hover:bg-gray-100'
              }`}
            >
              {form.features.includes(feature) && '✓ '}
              {feature}
            </button>
          ))}
        </div>
      </section>

      {/* Description + AI */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-bold text-lg text-text">Descripción</h3>
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
              toast.success('Descripción generada con IA ✨')
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
      </section>

      {/* Images */}
      <section>
        <h3 className="font-heading font-bold text-lg text-text mb-4">Imágenes</h3>
        <ImageUploader
          images={form.images}
          coverImage={form.coverImage}
          onImagesChange={(imgs) => updateField('images', imgs)}
          onCoverChange={(cover) => updateField('coverImage', cover)}
        />
      </section>

      {/* SEO */}
      <section>
        <h3 className="font-heading font-bold text-lg text-text mb-4">SEO</h3>
        <div className="space-y-4">
          <Input
            label="Meta título (máx 60 caracteres)"
            value={form.metaTitle || ''}
            onChange={(e) => updateField('metaTitle', e.target.value)}
            maxLength={60}
            placeholder="Se genera automático con IA"
          />
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Meta descripción (máx 155 caracteres)</label>
            <textarea
              value={form.metaDescription || ''}
              onChange={(e) => updateField('metaDescription', e.target.value)}
              maxLength={155}
              rows={2}
              className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text placeholder:text-text-light/60 focus:border-primary-light focus:ring-2 focus:ring-primary-light/10 transition-all text-sm"
              placeholder="Se genera automático con IA"
            />
          </div>
        </div>
      </section>

      {/* Options */}
      <section>
        <h3 className="font-heading font-bold text-lg text-text mb-4">Opciones</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl border border-border hover:bg-gray-50 transition-colors">
            <input type="checkbox" checked={form.featured} onChange={(e) => updateField('featured', e.target.checked)} className="w-4 h-4 rounded border-border text-primary-light" />
            <span className="text-sm text-text">⭐ Destacada</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl border border-border hover:bg-gray-50 transition-colors">
            <input type="checkbox" checked={form.published} onChange={(e) => updateField('published', e.target.checked)} className="w-4 h-4 rounded border-border text-primary-light" />
            <span className="text-sm text-text">👁️ Publicada</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl border border-border hover:bg-gray-50 transition-colors">
            <input type="checkbox" checked={form.acceptsPermuta} onChange={(e) => updateField('acceptsPermuta', e.target.checked)} className="w-4 h-4 rounded border-border text-purple-500" />
            <span className="text-sm text-text">🔁 Acepta permuta</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl border border-border hover:bg-gray-50 transition-colors">
            <input type="checkbox" checked={form.hasFinancing} onChange={(e) => updateField('hasFinancing', e.target.checked)} className="w-4 h-4 rounded border-border text-emerald-500" />
            <span className="text-sm text-text">💸 Financiación</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl border border-border hover:bg-gray-50 transition-colors">
            <input type="checkbox" checked={form.urgentSale} onChange={(e) => updateField('urgentSale', e.target.checked)} className="w-4 h-4 rounded border-border text-orange-500" />
            <span className="text-sm text-text">⚡ Venta urgente</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl border border-border hover:bg-gray-50 transition-colors">
            <input type="checkbox" checked={form.negotiable} onChange={(e) => updateField('negotiable', e.target.checked)} className="w-4 h-4 rounded border-border text-primary-light" />
            <span className="text-sm text-text">💬 Precio negociable</span>
          </label>
        </div>
      </section>

      {/* Submit */}
      <div className="flex items-center gap-4 pt-4 border-t border-border">
        <Button type="submit" loading={saving} size="lg">
          {isEditing ? 'Guardar cambios' : 'Crear propiedad'}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
