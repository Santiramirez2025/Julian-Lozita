'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import ChatBot from '@/components/ai/ChatBot'
import Hero from '@/components/home/Hero'
import FeaturedProperties from '@/components/home/FeaturedProperties'
import HowItWorks from '@/components/home/HowItWorks'
import Stats from '@/components/home/Stats'
import About from '@/components/home/About'
import Testimonials from '@/components/home/Testimonials'
import CTA from '@/components/home/CTA'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedProperties />
        <HowItWorks />
        <Stats />
        <About />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <WhatsAppFloat />
      <ChatBot />
    </>
  )
}