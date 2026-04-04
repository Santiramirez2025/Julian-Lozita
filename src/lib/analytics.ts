'use client'

import { useEffect, useRef, useCallback } from 'react'

function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  let sid = sessionStorage.getItem('jl_sid')
  if (!sid) {
    sid = Math.random().toString(36).substring(2) + Date.now().toString(36)
    sessionStorage.setItem('jl_sid', sid)
  }
  return sid
}

export function trackEvent(propertyId: string, type: string, value?: string) {
  if (typeof window === 'undefined') return

  const sessionId = getSessionId()
  
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ propertyId, type, value, sessionId }),
  }).catch(() => {}) // fire and forget
}

export function usePropertyTracking(propertyId: string) {
  const startTime = useRef(Date.now())
  const maxScroll = useRef(0)
  const tracked = useRef(false)

  // Track page view once
  useEffect(() => {
    if (!tracked.current) {
      trackEvent(propertyId, 'view')

      // Check if came from QR (referrer or direct)
      const params = new URLSearchParams(window.location.search)
      if (params.get('utm_source') === 'qr' || !document.referrer) {
        trackEvent(propertyId, 'qr_scan')
      }

      tracked.current = true
    }
  }, [propertyId])

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )
      if (scrollPercent > maxScroll.current) {
        maxScroll.current = scrollPercent
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track time on page when leaving
  useEffect(() => {
    const handleLeave = () => {
      const seconds = Math.round((Date.now() - startTime.current) / 1000)
      trackEvent(propertyId, 'time_on_page', seconds.toString())
      if (maxScroll.current > 0) {
        trackEvent(propertyId, 'scroll', maxScroll.current.toString())
      }
    }

    window.addEventListener('beforeunload', handleLeave)
    return () => window.removeEventListener('beforeunload', handleLeave)
  }, [propertyId])

  const trackWhatsApp = useCallback(() => {
    trackEvent(propertyId, 'whatsapp_click')
  }, [propertyId])

  const trackShare = useCallback(() => {
    trackEvent(propertyId, 'share')
  }, [propertyId])

  const trackGallery = useCallback(() => {
    trackEvent(propertyId, 'gallery_open')
  }, [propertyId])

  return { trackWhatsApp, trackShare, trackGallery }
}
