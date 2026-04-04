'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import ChatBot from '@/components/ai/ChatBot'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { getWhatsAppLink } from '@/lib/utils'

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: '', telefono: '', mensaje: '' })
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5493534000000'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `Hola Julián! Soy ${form.nombre}. ${form.mensaje}${form.telefono ? ` Mi teléfono: ${form.telefono}` : ''}`
    window.open(getWhatsAppLink(message), '_blank')
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-text mb-2">
              Contacto
            </h1>
            <p className="text-text-light mb-10">
              ¿Tenés consultas? Escribime y te respondo en el día.
            </p>

            {/* Contact info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-2xl border border-border hover:border-[#25D366] transition-colors bg-white"
              >
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">WhatsApp</p>
                  <p className="text-xs text-text-light">Respuesta en el día</p>
                </div>
              </a>
              <div className="flex items-center gap-3 p-4 rounded-2xl border border-border bg-white">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E3A5F" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">Villa María</p>
                  <p className="text-xs text-text-light">Córdoba, Argentina</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
              <h2 className="font-heading font-bold text-lg text-text mb-6">Enviame un mensaje</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Nombre"
                  value={form.nombre}
                  onChange={(e) => setForm((p) => ({ ...p, nombre: e.target.value }))}
                  placeholder="Tu nombre"
                  required
                />
                <Input
                  label="Teléfono (opcional)"
                  type="tel"
                  value={form.telefono}
                  onChange={(e) => setForm((p) => ({ ...p, telefono: e.target.value }))}
                  placeholder="Ej: 353 4123456"
                />
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Mensaje</label>
                  <textarea
                    value={form.mensaje}
                    onChange={(e) => setForm((p) => ({ ...p, mensaje: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text placeholder:text-text-light/60 focus:border-primary-light focus:ring-2 focus:ring-primary-light/10 transition-all"
                    placeholder="Contame qué estás buscando..."
                    required
                  />
                </div>
                <Button type="submit" variant="whatsapp" size="lg" className="w-full">
                  Enviar por WhatsApp
                </Button>
              </form>
              <p className="text-xs text-text-light text-center mt-4">
                El mensaje se envía directo por WhatsApp a Julián.
              </p>
            </div>

            {/* Hours */}
            <div className="mt-8 text-center">
              <p className="text-sm text-text-light">
                <span className="font-semibold text-text">Horario de atención:</span> Lunes a Viernes 9:00 - 19:00, Sábados 9:00 - 13:00
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
      <ChatBot />
    </>
  )
}
