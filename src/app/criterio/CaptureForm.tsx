'use client'

import { useEffect, useRef, useState } from 'react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function DownloadButton({ full = false }: { full?: boolean }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary-light to-accent px-6 py-4 font-semibold text-primary shadow-lg shadow-accent/20 transition-all hover:shadow-accent/40',
        full ? 'w-full' : '',
      ].join(' ')}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M12 3v12m0 0 4-4m-4 4-4-4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Descargar PDF
    </button>
  )
}

export default function CaptureForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [company, setCompany] = useState('') // honeypot
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const renderedAt = useRef<number>(0)
  const source = useRef<string>('criterio')

  useEffect(() => {
    renderedAt.current = Date.now()
    // Canal de origen: ?src= o ?utm_source= (para separar los ~20 canales).
    const params = new URLSearchParams(window.location.search)
    const s = params.get('src') || params.get('utm_source')
    if (s) source.current = s.slice(0, 60)
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (sending) return
    setError('')

    if (!name.trim()) return setError('Necesitamos tu nombre')
    if (!EMAIL_RE.test(email.trim())) return setError('El email no parece válido')

    setSending(true)
    try {
      const res = await fetch('/api/criterio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          whatsapp: whatsapp.trim() || undefined,
          company, // honeypot
          ts: renderedAt.current,
          source: source.current,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || 'No se pudo guardar. Probá de nuevo.')
      }
      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar. Probá de nuevo.')
    } finally {
      setSending(false)
    }
  }

  if (done) {
    return (
      <div className="text-center py-4">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-light to-accent">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-8 w-8 text-primary">
            <path d="m5 12 5 5 9-11" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-bold text-white">
          Listo{name ? `, ${name.split(' ')[0]}` : ''}. Ya la tenés.
        </h3>
        <p className="mx-auto mt-2 mb-7 max-w-sm text-[15px] text-white/55">
          Te la mandamos también por email. Y si querés llevarla a la visita, descargala ahora en PDF
          y guardala en el teléfono.
        </p>
        <DownloadButton />
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      {/* Honeypot — oculto para humanos, tentador para bots */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden" tabIndex={-1}>
        <label>
          No completar
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>
      </div>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tu nombre"
        autoComplete="name"
        required
        className="w-full rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-white/35 focus:border-accent/60"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Tu email"
        autoComplete="email"
        inputMode="email"
        required
        className="w-full rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-white/35 focus:border-accent/60"
      />
      <input
        type="tel"
        value={whatsapp}
        onChange={(e) => setWhatsapp(e.target.value)}
        placeholder="WhatsApp (opcional)"
        autoComplete="tel"
        inputMode="tel"
        className="w-full rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-white/35 focus:border-accent/60"
      />

      {error && (
        <p role="alert" className="text-sm text-[#FCA5A5]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary-light to-accent px-6 py-4 font-semibold text-primary shadow-lg shadow-accent/20 transition-all hover:shadow-accent/40 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {sending ? (
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <>
            Descargar la guía en PDF
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        )}
      </button>
      <p className="text-center text-xs text-white/35">
        Sin spam. Tu email es solo para mandarte la guía y novedades ocasionales.
      </p>
    </form>
  )
}
