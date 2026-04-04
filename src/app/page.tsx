import type { Metadata } from 'next'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingWidgets from '@/components/layout/FloatingWidgets'
import Hero from '@/components/home/Hero'
import FeaturedProperties from '@/components/home/FeaturedProperties'
import Stats from '@/components/home/Stats'
import HowItWorks from '@/components/home/HowItWorks'
import Zones from '@/components/home/Zones'
import About from '@/components/home/About'
import CTA from '@/components/home/CTA'

// ─── Metadata ───
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://julianlozita.com'

export const metadata: Metadata = {
  title: 'Julián Lozita Inmobiliaria | Propiedades en Villa María, Córdoba',
  description:
    'Encontrá casas, departamentos, terrenos y locales en Villa María y zona. Julián Lozita te asesora en compra, venta y alquiler de propiedades con atención personalizada.',
  keywords: [
    'inmobiliaria villa maría',
    'propiedades villa maría',
    'casas en venta villa maría',
    'departamentos villa maría',
    'terrenos villa maría',
    'alquiler villa maría',
    'inmobiliaria córdoba',
    'julián lozita',
  ],
  authors: [{ name: 'Julián Lozita', url: siteUrl }],
  creator: 'Santiago Ramírez',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: siteUrl,
    siteName: 'Julián Lozita Inmobiliaria',
    title: 'Julián Lozita Inmobiliaria | Propiedades en Villa María',
    description:
      'Casas, departamentos y terrenos en Villa María, Córdoba. Asesoramiento personalizado en compra, venta y alquiler.',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Julián Lozita Inmobiliaria — Propiedades en Villa María',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Julián Lozita Inmobiliaria | Villa María, Córdoba',
    description:
      'Encontrá tu próxima propiedad en Villa María. Casas, departamentos, terrenos y más.',
    images: [`${siteUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// ─── JSON-LD Structured Data ───
function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Julián Lozita Inmobiliaria',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/og-image.jpg`,
    description:
      'Inmobiliaria en Villa María, Córdoba. Compra, venta y alquiler de casas, departamentos, terrenos y locales comerciales.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Villa María',
      addressRegion: 'Córdoba',
      addressCountry: 'AR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -32.4074,
      longitude: -63.2428,
    },
    areaServed: {
      '@type': 'City',
      name: 'Villa María',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      availableLanguage: 'Spanish',
    },
    sameAs: [
      'https://instagram.com/julianlozita',
      'https://facebook.com/julianlozita',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ─── Page ───
export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Navbar />

      <main>
        {/* 1. Hook — captura atención + CTA principal */}
        <Hero />

        {/* 2. Prueba — muestra producto real inmediato */}
        <FeaturedProperties />

        {/* 3. Validación — números que generan confianza */}
        <Stats />

        {/* 4. Proceso — reduce incertidumbre */}
        <HowItWorks />

        {/* 5. Zonas — SEO local + links internos */}
        <Zones />

        {/* 6. Persona — conexión humana */}
        <About />

        {/* 7. Cierre — CTA final con urgencia */}
        <CTA />
      </main>

      <Footer />

      {/* Floating elements — client-side only, no SSR */}
      <FloatingWidgets />
    </>
  )
}