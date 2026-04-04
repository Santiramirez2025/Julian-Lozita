'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Property } from '@/types'
import { formatPrice } from '@/lib/utils'

interface PropertyMapInteractiveProps {
  properties: Property[]
  onPropertyClick?: (slug: string) => void
}

const VILLA_MARIA_CENTER: [number, number] = [-32.4073, -63.2408]

export default function PropertyMapInteractive({
  properties,
  onPropertyClick,
}: PropertyMapInteractiveProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.LayerGroup | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const propertiesWithCoords = properties.filter((p) => p.latitude && p.longitude)

  // Build popup HTML
  const createPopupContent = useCallback((property: Property) => {
    const statusLabel =
      property.status === 'reserved'
        ? '<span style="color:#F59E0B;font-size:10px;font-weight:600">RESERVADA</span>'
        : property.status === 'sold'
          ? '<span style="color:#EF4444;font-size:10px;font-weight:600">VENDIDA</span>'
          : ''

    return `
      <div style="font-family:var(--font-body);min-width:200px;max-width:240px">
        ${
          property.coverImage
            ? `<img src="${property.coverImage}" alt="${property.title}" style="width:100%;height:110px;object-fit:cover;border-radius:10px;margin-bottom:8px" loading="lazy"/>`
            : `<div style="width:100%;height:80px;background:var(--color-bg);border-radius:10px;margin-bottom:8px;display:flex;align-items:center;justify-content:center;color:var(--color-text-light);font-size:11px">Sin foto</div>`
        }
        ${statusLabel}
        <p style="font-weight:700;font-size:13px;margin:2px 0 4px;color:var(--color-text);line-height:1.3">${property.title}</p>
        <p style="font-family:var(--font-mono);font-weight:600;color:var(--color-primary);font-size:14px;margin:0 0 2px">${formatPrice(property.price, property.currency)}</p>
        <p style="font-size:11px;color:var(--color-text-light);margin:0 0 8px">${property.neighborhood || 'Villa María'}</p>
        <a href="/propiedades/${property.slug}" style="display:block;text-align:center;background:var(--color-primary);color:white;padding:7px 12px;border-radius:10px;text-decoration:none;font-size:12px;font-weight:600;transition:opacity 0.2s" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
          Ver detalles →
        </a>
      </div>
    `
  }, [])

  // Create marker icon by status
  const createMarkerIcon = useCallback((status: string, L: typeof import('leaflet')) => {
    const colors: Record<string, string> = {
      available: 'var(--color-primary)',
      reserved: 'var(--color-reserved)',
      sold: 'var(--color-sold)',
    }
    const color = colors[status] || colors.available

    return L.divIcon({
      html: `<div style="
        width:34px;height:34px;
        background:${color};
        border-radius:50%;
        border:3px solid white;
        box-shadow:0 2px 8px rgba(0,0,0,0.25);
        display:flex;align-items:center;justify-content:center;
        cursor:pointer;
        transition:transform 0.15s ease;
      " onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
      </div>`,
      className: '',
      iconSize: [34, 34],
      iconAnchor: [17, 34],
      popupAnchor: [0, -34],
    })
  }, [])

  // Update markers without destroying the map
  const updateMarkers = useCallback(
    async (map: L.Map) => {
      const L = (await import('leaflet')).default

      // Clear existing markers
      if (markersRef.current) {
        markersRef.current.clearLayers()
      } else {
        markersRef.current = L.layerGroup().addTo(map)
      }

      if (propertiesWithCoords.length === 0) return

      propertiesWithCoords.forEach((property) => {
        const icon = createMarkerIcon(property.status || 'available', L)
        const marker = L.marker([property.latitude!, property.longitude!], { icon })

        marker.bindPopup(createPopupContent(property), {
          maxWidth: 260,
          className: 'property-popup',
          closeButton: true,
        })

        marker.on('click', () => {
          if (onPropertyClick) onPropertyClick(property.slug)
        })

        markersRef.current!.addLayer(marker)
      })

      // Fit bounds
      if (propertiesWithCoords.length > 1) {
        const bounds = L.latLngBounds(
          propertiesWithCoords.map((p) => [p.latitude!, p.longitude!])
        )
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 })
      } else if (propertiesWithCoords.length === 1) {
        map.setView(
          [propertiesWithCoords[0].latitude!, propertiesWithCoords[0].longitude!],
          14
        )
      }
    },
    [propertiesWithCoords, createMarkerIcon, createPopupContent, onPropertyClick]
  )

  // Initialize map once
  useEffect(() => {
    if (!mapContainerRef.current || !isVisible || mapRef.current) return

    setIsLoading(true)

    const initMap = async () => {
      const L = (await import('leaflet')).default

      const map = L.map(mapContainerRef.current!, {
        center: VILLA_MARIA_CENTER,
        zoom: 13,
        scrollWheelZoom: false,
        zoomControl: true,
        dragging: true,
      })

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '© OpenStreetMap, © CartoDB',
          maxZoom: 19,
        }
      ).addTo(map)

      mapRef.current = map
      await updateMarkers(map)
      setIsLoading(false)
    }

    initMap()

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        markersRef.current = null
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible])

  // Update markers when properties change (without destroying the map)
  useEffect(() => {
    if (mapRef.current && isVisible) {
      updateMarkers(mapRef.current)
    }
  }, [properties, isVisible, updateMarkers])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  if (propertiesWithCoords.length === 0) return null

  return (
    <div className="mb-6">
      {!isVisible ? (
        <button
          onClick={() => setIsVisible(true)}
          className="w-full py-3.5 rounded-2xl border border-border bg-white hover:bg-gray-50 hover:border-primary/15 transition-all flex items-center justify-center gap-2.5 text-sm font-medium text-text-light group"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary/50 group-hover:text-primary transition-colors"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Ver mapa con {propertiesWithCoords.length} propiedades
        </button>
      ) : (
        <div className="rounded-2xl overflow-hidden border border-border bg-white">
          {/* Map header */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
            <span className="text-sm font-medium text-text flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {propertiesWithCoords.length} propiedades en el mapa
            </span>
            <button
              onClick={() => {
                setIsVisible(false)
                if (mapRef.current) {
                  mapRef.current.remove()
                  mapRef.current = null
                  markersRef.current = null
                }
              }}
              className="text-xs font-medium text-text-light hover:text-text transition-colors px-2 py-1 rounded-lg hover:bg-gray-50"
            >
              Cerrar
            </button>
          </div>

          {/* Map container */}
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-bg">
                <div className="flex items-center gap-2 text-text-light text-sm">
                  <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  Cargando mapa...
                </div>
              </div>
            )}
            <div
              ref={mapContainerRef}
              className="w-full h-[280px] sm:h-[360px] lg:h-[420px]"
            />
          </div>
        </div>
      )}
    </div>
  )
}