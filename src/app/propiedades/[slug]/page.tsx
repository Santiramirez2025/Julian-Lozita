import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import PropertyDetailClient from './PropertyDetailClient'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const property = await prisma.property.findUnique({ where: { slug } })

  if (!property) return { title: 'Propiedad no encontrada' }

  const title = property.metaTitle || `${property.title} en Venta`
  const description =
    property.metaDescription ||
    `${property.title} en ${property.neighborhood}, Villa María. ${property.currency} ${property.price.toLocaleString()}.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: property.coverImage ? [{ url: property.coverImage }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: property.coverImage ? [property.coverImage] : [],
    },
  }
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params
  const property = await prisma.property.findUnique({ where: { slug } })

  if (!property || !property.published) {
    notFound()
  }

  // Fetch similar properties
  const similar = await prisma.property.findMany({
    where: {
      published: true,
      status: 'available',
      id: { not: property.id },
      OR: [
        { propertyType: property.propertyType },
        { neighborhood: property.neighborhood },
      ],
    },
    take: 3,
    orderBy: { createdAt: 'desc' },
  })

  // Schema.org for this listing
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/propiedades/${property.slug}`,
    image: property.images,
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: property.currency,
      availability:
        property.status === 'available'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/SoldOut',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address,
      addressLocality: property.city,
      addressRegion: property.province,
      addressCountry: 'AR',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PropertyDetailClient property={JSON.parse(JSON.stringify(property))} similar={JSON.parse(JSON.stringify(similar))} />
    </>
  )
}
