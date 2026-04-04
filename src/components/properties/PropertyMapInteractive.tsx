'use client'

import { useEffect, useRef, useState } from 'react'
import { Property } from '@/types'
import { formatPrice } from '@/lib/utils'

interface PropertyMapInteractiveProps {
  properties: Property[]
  onPropertyClick?: (slug: string) => void
}

export default function PropertyMapInteractive({ properties, onPropertyClick }: PropertyMapInteractiveProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const propertiesWithCoords = properties.filter((p) => p.latitude && p.longitude)

  useEffect(() => {
    if (!mapRef.current || !isVisible || mapInstanceRef.current) return
    if (propertiesWithCoords.length === 0) return

    const initMap = async () => {
      const L = (await import('leaflet')).default

      const center = propertiesWithCoords.length > 0
        ? [propertiesWithCoords[0].latitude!, propertiesWithCoords[0].longitude!] as [number, number]
        : [-32.4073, -63.2408] as [number, number]

      const map = L.map(mapRef.current!, {
        center,
        zoom: 13,
        scrollWheelZoom: false,
        zoomControl: true,
      })

      // Styled tiles (CartoDB Voyager - free, modern style)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap, © CartoDB',
        maxZoom: 19,
      }).addTo(map)

      // Add markers with custom icons
      propertiesWithCoords.forEach((property) => {
        const statusColor = property.status === 'available' ? '#1E3A5F' : property.status === 'reserved' ? '#F59E0B' : '#EF4444'

        const icon = L.divIcon({
          html: `<div style="
            width:36px;height:36px;
            background:${statusColor};
            border-radius:50%;
            border:3px solid white;
            box-shadow:0 2px 10px rgba(0,0,0,0.3);
            display:flex;align-items:center;justify-content:center;
            cursor:pointer;
            transition:transform 0.2s;
          " onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
          </div>`,
          className: '',
          iconSize: [36, 36],
          iconAnchor: [18, 36],
          popupAnchor: [0, -36],
        })

        const marker = L.marker([property.latitude!, property.longitude!], { icon }).addTo(map)

        const popupContent = `
          <div style="font-family:Inter,sans-serif;min-width:200px;padding:4px">
            ${property.coverImage ? `<img src="${property.coverImage}" style="width:100%;height:100px;object-fit:cover;border-radius:8px;margin-bottom:8px"/>` : ''}
            <p style="font-weight:700;font-size:13px;margin:0 0 4px;color:#1A1A2E">${property.title}</p>
            <p style="font-family:'JetBrains Mono',monospace;font-weight:600;color:#1E3A5F;font-size:14px;margin:0 0 4px">${formatPrice(property.price, property.currency)}</p>
            <p style="font-size:11px;color:#64748B;margin:0">${property.neighborhood}</p>
            <a href="/propiedades/${property.slug}" style="display:block;margin-top:8px;text-align:center;background:#1E3A5F;color:white;padding:6px;border-radius:8px;text-decoration:none;font-size:12px;font-weight:600">Ver propiedad →</a>
          </div>
        `

        marker.bindPopup(popupContent, {
          maxWidth: 250,
          className: 'property-popup',
        })

        marker.on('click', () => {
          if (onPropertyClick) onPropertyClick(property.slug)
        })
      })

      // Fit bounds to show all markers
      if (propertiesWithCoords.length > 1) {
        const bounds = L.latLngBounds(propertiesWithCoords.map((p) => [p.latitude!, p.longitude!]))
        map.fitBounds(bounds, { padding: [50, 50] })
      }

      mapInstanceRef.current = map
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [isVisible, propertiesWithCoords, onPropertyClick])

  // Destroy and rebuild when properties change
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
      mapInstanceRef.current = null
    }
  }, [properties])

  if (propertiesWithCoords.length === 0) return null

  return (
    <div className="mb-8">
      {!isVisible ? (
        <button
          onClick={() => setIsVisible(true)}
          className="w-full py-4 rounded-2xl border border-border bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-text-light"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Ver mapa con {propertiesWithCoords.length} propiedades
        </button>
      ) : (
        <div className="rounded-2xl overflow-hidden border border-border">
          <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-border">
            <span className="text-sm font-medium text-text">
              📍 {propertiesWithCoords.length} propiedades en el mapa
            </span>
            <button
              onClick={() => { setIsVisible(false); mapInstanceRef.current?.remove(); mapInstanceRef.current = null }}
              className="text-xs text-text-light hover:text-text"
            >
              Cerrar mapa
            </button>
          </div>
          <div ref={mapRef} className="w-full h-[400px]" />
        </div>
      )}
    </div>
  )
}
