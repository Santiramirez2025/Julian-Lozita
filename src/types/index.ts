export interface Property {
  id: string
  title: string
  slug: string
  description: string
  price: number
  currency: string
  address: string
  neighborhood: string
  city: string
  province: string
  latitude: number | null
  longitude: number | null
  propertyType: string
  rooms: number | null
  bedrooms: number | null
  bathrooms: number | null
  garages: number | null
  totalArea: number | null
  coveredArea: number | null
  features: string[]
  images: string[]
  coverImage: string
  status: string
  featured: boolean
  published: boolean
  acceptsPermuta: boolean
  hasFinancing: boolean
  urgentSale: boolean
  negotiable: boolean
  metaTitle: string | null
  metaDescription: string | null
  createdAt: Date
  updatedAt: Date
}

export interface PropertyFormData {
  title: string
  description: string
  price: number
  currency: string
  address: string
  neighborhood: string
  latitude?: number
  longitude?: number
  propertyType: string
  rooms?: number
  bedrooms?: number
  bathrooms?: number
  garages?: number
  totalArea?: number
  coveredArea?: number
  features: string[]
  images: string[]
  coverImage: string
  status: string
  featured: boolean
  published: boolean
  acceptsPermuta: boolean
  hasFinancing: boolean
  urgentSale: boolean
  negotiable: boolean
  metaTitle?: string
  metaDescription?: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface AISearchResult {
  id: string
  relevance: number
  reason: string
}

export interface AIDescriptionResult {
  description: string
  metaTitle: string
  metaDescription: string
}

export type PropertyType = 'casa' | 'departamento' | 'terreno' | 'local' | 'galpon'
export type PropertyStatus = 'available' | 'reserved' | 'sold'
export type Currency = 'USD' | 'ARS'

export interface PropertyFilters {
  propertyType?: string
  minPrice?: number
  maxPrice?: number
  rooms?: number
  neighborhood?: string
  status?: string
}

export interface PropertyEvent {
  id: string
  propertyId: string
  type: string
  value: string | null
  createdAt: Date
}

export interface PropertyScore {
  propertyId: string
  heatScore: number
  totalViews: number
  uniqueViews: number
  qrScans: number
  whatsappClicks: number
  avgTimeOnPage: number
  scrollDepth: number
  shares: number
  priceAnalysis: {
    vsMarket: 'above' | 'below' | 'fair'
    percentDiff: number | null
    recommendation: string
  } | null
  aiSuggestions: {
    suggestions: { type: string; priority: string; text: string }[]
    demandLevel: 'hot' | 'warm' | 'cold'
    summary: string
  } | null
}
