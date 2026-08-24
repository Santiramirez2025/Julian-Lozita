'use client'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5493534222575'
const WA_LINK = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
  'Hola Julián, quiero hacerte una consulta.'
)}`

export default function LandingFooter() {
  return (
    <footer className="relative bg-[#0A0A0F] border-t border-white/10 py-14 overflow-hidden">
      <div className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 w-[36rem] h-64 bg-primary/12 blur-[120px]" />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-md">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-light to-accent flex items-center justify-center font-heading font-bold text-primary text-sm">
                J
              </span>
              <span className="text-white font-heading font-bold tracking-tight text-lg">J-Lozita</span>
            </div>
            <p className="text-white/50 leading-relaxed">
              Julián Lozita — Escribano Público y Abogado. Asesoramiento y estrategia inmobiliaria &
              patrimonial en Villa María, Córdoba.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3 font-semibold text-white shadow-lg shadow-[#25D366]/20 transition-transform hover:scale-[1.03]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.34 0-4.508-.654-6.365-1.787l-.444-.267-3.07 1.03 1.03-3.07-.267-.444A9.955 9.955 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
              </svg>
              Hablar con Julián
            </a>
            <span className="text-white/35 text-sm">Villa María · Córdoba · Argentina</span>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row justify-between gap-3 text-white/30 text-sm">
          <span>© {new Date().getFullYear()} J-Lozita. Todos los derechos reservados.</span>
          <span className="font-mono tracking-wider">Nuevas propiedades, muy pronto.</span>
        </div>
      </div>
    </footer>
  )
}
