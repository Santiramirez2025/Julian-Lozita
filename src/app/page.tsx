import type { Metadata } from 'next'
import LandingHero from '@/components/landing/LandingHero'
import Credentials from '@/components/landing/Credentials'
import Process from '@/components/landing/Process'
import LandingFooter from '@/components/landing/LandingFooter'

export const metadata: Metadata = {
  title: 'J-Lozita | Asesor Inmobiliario & Patrimonial en Villa María',
  description:
    'Julián no vende casas: es el asesor al que le consultás antes de una decisión inmobiliaria o patrimonial. Escribano Público y Abogado en Villa María, Córdoba. Armá tu perfil en 30 segundos.',
}

export default function HomePage() {
  return (
    <main className="bg-[#07070C]">
      <LandingHero />
      <Credentials />
      <Process />
      <LandingFooter />
    </main>
  )
}
