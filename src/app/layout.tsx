import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import ToastProvider from '@/components/ui/Toast'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'J-Lozita | Estrategia Inmobiliaria & Patrimonial en Villa María, Córdoba',
    template: '%s | J-Lozita Villa María',
  },
  description:
    'Julián NO es un profesional que vende casas. Es un asesor al que le consultás antes de tomar una decisión inmobiliaria o patrimonial importante. Villa María, Córdoba.',
  keywords: [
    'asesor inmobiliario villa maría',
    'asesoramiento patrimonial villa maría',
    'inversión inmobiliaria córdoba',
    'estrategia patrimonial villa maría',
    'inversión en pozo villa maría',
  ],
  authors: [{ name: 'Julián Lozita' }],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://julianlozita.com',
    siteName: 'J-Lozita — Asesoramiento y Estrategia Inmobiliaria & Patrimonial',
    title: 'J-Lozita | Estrategia Inmobiliaria & Patrimonial en Villa María',
    description:
      'Julián NO es un profesional que vende casas. Es un asesor al que le consultás antes de tomar una decisión inmobiliaria o patrimonial importante.',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://julianlozita.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['RealEstateAgent', 'ProfessionalService'],
    name: 'J-Lozita — Asesoramiento y Estrategia Inmobiliaria & Patrimonial',
    description:
      'Julián NO es un profesional que vende casas. Es un asesor al que le consultás antes de tomar una decisión inmobiliaria o patrimonial importante. Villa María, Córdoba, Argentina.',
    url: 'https://julianlozita.com',
    areaServed: {
      '@type': 'City',
      name: 'Villa María',
      containedInPlace: { '@type': 'State', name: 'Córdoba' },
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Villa María',
      addressRegion: 'Córdoba',
      addressCountry: 'AR',
    },
  }

  return (
    <html lang="es" className={`${jakarta.variable} ${inter.variable} ${jetbrains.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <ToastProvider />
      </body>
    </html>
  )
}
