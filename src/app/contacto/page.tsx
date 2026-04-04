import type { Metadata } from 'next'
import ContactoClient from './ContactoClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://julianlozita.com'

export const metadata: Metadata = {
  title: 'Contacto | Julián Lozita Inmobiliaria — Villa María, Córdoba',
  description:
    'Contactá a Julián Lozita por WhatsApp o teléfono. Asesoramiento inmobiliario personalizado en Villa María, Córdoba. Respuesta en minutos.',
  openGraph: {
    title: 'Contacto | Julián Lozita Inmobiliaria',
    description:
      'Escribile a Julián por WhatsApp o llamalo directo. Inmobiliaria en Villa María.',
    url: `${siteUrl}/contacto`,
  },
  alternates: {
    canonical: `${siteUrl}/contacto`,
  },
}

function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Julián Lozita Inmobiliaria',
    url: siteUrl,
    telephone: '+5493534000000',
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
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '13:00',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: '+5493534000000',
      availableLanguage: 'Spanish',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function ContactoPage() {
  return (
    <>
      <JsonLd />
      <ContactoClient />
    </>
  )
}