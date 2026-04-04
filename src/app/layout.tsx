import type { Metadata, Viewport } from 'next'
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://julianlozita.com'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAFA' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0F' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Julián Lozita Inmobiliaria | Propiedades en Villa María, Córdoba',
    template: '%s | Julián Lozita Inmobiliaria',
  },
  description:
    'Encontrá casas, departamentos, terrenos y locales en Villa María y zona. Asesoramiento personalizado en compra, venta y alquiler de propiedades.',
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
        url: '/og-image.jpg',
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
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // WebSite schema — distinct from RealEstateAgent in page.tsx
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Julián Lozita Inmobiliaria',
    url: siteUrl,
    description:
      'Inmobiliaria en Villa María, Córdoba. Compra, venta y alquiler de propiedades.',
    publisher: {
      '@type': 'Organization',
      name: 'Julián Lozita Inmobiliaria',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/propiedades?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <html lang="es" className={`${jakarta.variable} ${inter.variable} ${jetbrains.variable}`}>
      <head>
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