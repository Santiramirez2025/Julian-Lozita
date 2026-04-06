'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import ChatBot from '@/components/ai/ChatBot'
import PropertyGallery from '@/components/properties/PropertyGallery'
import PropertyDetails from '@/components/properties/PropertyDetails'
import PropertyContact from '@/components/properties/PropertyContact'
import PropertyMap from '@/components/properties/PropertyMap'
import PropertyQR from '@/components/properties/PropertyQR'
import PropertyShare from '@/components/properties/PropertyShare'
import PropertyCard from '@/components/properties/PropertyCard'
import PropertyBadges from '@/components/properties/PropertyBadges'
import PriceSimulator from '@/components/properties/PriceSimulator'
import StickyContactBar from '@/components/properties/StickyContactBar'
import Badge from '@/components/ui/Badge'
import { Property } from '@/types'
import { usePropertyTracking } from '@/lib/analytics'
import { getWhatsAppLink, timeAgo, formatPrice } from '@/lib/utils'

interface Props {
  property: Property
  similar: Property[]
}

export default function PropertyDetailClient({ property, similar }: Props) {
  const { trackWhatsApp, trackShare, trackGallery } = usePropertyTracking(property.id)
  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16 bg-bg min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-text-light mb-6 pt-4">
            <a href="/propiedades" className="hover:text-primary transition-colors">
              Propiedades
            </a>
            <span>/</span>
            <span className="text-text">{property.title}</span>
          </div>

          {/* Status badge */}
          {property.status !== 'available' && (
            <div className="mb-4">
              <Badge variant={property.status === 'sold' ? 'danger' : 'warning'}>
                {property.status === 'sold' ? 'Vendida' : 'Reservada'}
              </Badge>
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-text mb-3">
            {property.title}
          </h1>

          {/* Commercial badges + time */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <PropertyBadges property={property} size="md" />
            <span className="text-xs text-text-light/50">
              Publicada {timeAgo(new Date(property.createdAt)).toLowerCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column: gallery + details */}
            <div className="lg:col-span-2 space-y-8">
              <PropertyGallery images={property.images} title={property.title} />
              <PropertyDetails property={property} />

              {/* Map */}
              {property.latitude && property.longitude && (
                <div>
                  <h2 className="font-heading font-bold text-xl text-text mb-3">Mapa</h2>
                  <PropertyMap
                    latitude={property.latitude}
                    longitude={property.longitude}
                    title={property.title}
                  />
                </div>
              )}

              {/* Share */}
              <div>
                <h2 className="font-heading font-bold text-xl text-text mb-3">Compartir</h2>
                <PropertyShare slug={property.slug} title={property.title} />
              </div>
            </div>

            {/* Right column: contact + tools */}
            <div className="space-y-5">
              <PropertyContact title={property.title} neighborhood={property.neighborhood} />

              {/* Agendar visita */}
              <a
                href={getWhatsAppLink(`Hola Julián! Quiero agendar una visita para ver "${property.title}" en ${property.neighborhood}. ¿Cuándo se puede?`)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWhatsApp}
                className="block w-full text-center py-3.5 rounded-2xl bg-primary text-white font-semibold text-sm hover:bg-primary-light transition-all"
              >
                📅 Agendar visita
              </a>

              {/* Negotiate button */}
              {property.negotiable && (
                <a
                  href={getWhatsAppLink(`Hola Julián! Vi "${property.title}" en ${property.neighborhood}. ¿El precio es negociable? Me interesa.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsApp}
                  className="block w-full text-center py-3.5 rounded-2xl border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-all"
                >
                  💬 ¿Se puede negociar?
                </a>
              )}

              {/* Price simulator */}
              <PriceSimulator
                price={property.price}
                currency={property.currency}
                title={property.title}
                neighborhood={property.neighborhood}
              />

              {/* Julián personal message */}
              <div className="rounded-2xl border border-border p-5 bg-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-heading font-extrabold text-primary">JL</span>
                  </div>
                  <div>
                    <p className="font-semibold text-text text-sm">Julián Lozita</p>
                    <p className="text-xs text-text-light">Corredor inmobiliario</p>
                  </div>
                </div>
                <p className="text-sm text-text-light leading-relaxed">
                  &ldquo;Soy Julián, escribime sin compromiso. Te cuento todo sobre esta propiedad y te ayudo a encontrar lo que buscás 👍&rdquo;
                </p>
              </div>

              <PropertyQR slug={property.slug} />
            </div>
          </div>

          {/* Similar properties */}
          {similar.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-heading font-extrabold text-text mb-6">
                Propiedades similares
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similar.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
      <ChatBot />
      {property.status === 'available' && (
        <StickyContactBar
          title={property.title}
          neighborhood={property.neighborhood}
          price={formatPrice(property.price, property.currency)}
          onWhatsAppClick={trackWhatsApp}
        />
      )}
    </>
  )
}