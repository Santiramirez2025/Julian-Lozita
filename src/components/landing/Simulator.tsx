'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/* ------------------------------------------------------------------ */
/*  Configuración de preguntas                                         */
/* ------------------------------------------------------------------ */

type OptionKey = string

interface Option {
  value: OptionKey
  label: string
  hint?: string
  icon: React.ReactNode
}

interface Step {
  id: 'objetivo' | 'presupuesto' | 'tipo' | 'zona' | 'plazo'
  eyebrow: string
  question: string
  options: Option[]
}

// Iconos SVG minimalistas (stroke, heredan currentColor)
const I = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M9.5 21v-6h5v6" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" /><path d="M7 15l3-4 3 3 4-6" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" /><path d="m9 12 2 2 4-4" />
    </svg>
  ),
  swap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3l4 4-4 4" /><path d="M21 7H7" /><path d="M7 21l-4-4 4-4" /><path d="M3 17h14" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="3" width="14" height="18" rx="1.5" /><path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h.01M15 15h.01" />
    </svg>
  ),
  land: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 19h18" /><path d="M5 19V9l7-4 7 4v10" /><path d="M12 5v14" />
    </svg>
  ),
  store: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9V5h16v4" /><path d="M4 9a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0" /><path d="M5 11v10h14V11" />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  map: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 4 6 2 6-2v14l-6 2-6-2-6 2V6l6-2Z" /><path d="M9 4v14M15 6v14" />
    </svg>
  ),
  trees: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 7 10h10L12 3Z" /><path d="M12 8 8 14h8l-4-6Z" /><path d="M12 14v7" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </svg>
  ),
  wallet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18" /><path d="M16 14h2" />
    </svg>
  ),
  gem: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l3 6-9 12L3 9l3-6Z" /><path d="M3 9h18M9 3 7.5 9 12 21M15 3l1.5 6L12 21" />
    </svg>
  ),
  question: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .8-1 1.7" /><path d="M12 17h.01" />
    </svg>
  ),
}

const STEPS: Step[] = [
  {
    id: 'objetivo',
    eyebrow: 'Paso 1',
    question: '¿Qué te trae hoy?',
    options: [
      { value: 'comprar_vivir', label: 'Comprar para vivir', hint: 'Mi próxima casa o depto', icon: I.home },
      { value: 'invertir', label: 'Invertir', hint: 'Que mi plata rinda', icon: I.chart },
      { value: 'resguardar', label: 'Resguardar patrimonio', hint: 'Proteger lo que tengo', icon: I.shield },
      { value: 'vender_permuta', label: 'Vender o permutar', hint: 'Tengo algo para mover', icon: I.swap },
    ],
  },
  {
    id: 'presupuesto',
    eyebrow: 'Paso 2',
    question: '¿Con qué capital estás pensando moverte?',
    options: [
      { value: 'menos_50k', label: 'Hasta USD 50.000', icon: I.wallet },
      { value: '50_100k', label: 'USD 50.000 – 100.000', icon: I.wallet },
      { value: '100_200k', label: 'USD 100.000 – 200.000', icon: I.gem },
      { value: 'mas_200k', label: 'Más de USD 200.000', icon: I.gem },
      { value: 'a_definir', label: 'Prefiero definirlo con Julián', icon: I.question },
    ],
  },
  {
    id: 'tipo',
    eyebrow: 'Paso 3',
    question: '¿Qué tipo de propiedad tenés en mente?',
    options: [
      { value: 'casa', label: 'Casa', icon: I.home },
      { value: 'departamento', label: 'Departamento', icon: I.building },
      { value: 'lote', label: 'Lote / terreno', icon: I.land },
      { value: 'local', label: 'Local / comercial', icon: I.store },
      { value: 'otro', label: 'Otro', icon: I.spark },
      { value: 'no_seguro', label: 'Todavía no lo sé', icon: I.question },
    ],
  },
  {
    id: 'zona',
    eyebrow: 'Paso 4',
    question: '¿En qué zona te gustaría?',
    options: [
      { value: 'centro', label: 'Villa María centro', icon: I.pin },
      { value: 'barrios', label: 'Barrios de Villa María', icon: I.map },
      { value: 'afueras', label: 'Countries / afueras', icon: I.trees },
      { value: 'no_seguro', label: 'Abierto a opciones', icon: I.compass },
    ],
  },
  {
    id: 'plazo',
    eyebrow: 'Paso 5',
    question: '¿Cuándo te gustaría concretar?',
    options: [
      { value: 'ya', label: 'Estoy listo ahora', hint: 'Quiero avanzar ya', icon: I.spark },
      { value: '1_3_meses', label: 'En 1 a 3 meses', hint: 'Estoy definiendo', icon: I.calendar },
      { value: 'explorando', label: 'Explorando', hint: 'Sin apuro, viendo opciones', icon: I.clock },
    ],
  },
]

// Etiquetas legibles para el resumen / WhatsApp
const LABELS: Record<string, string> = {
  comprar_vivir: 'Comprar para vivir',
  invertir: 'Invertir',
  resguardar: 'Resguardar patrimonio',
  vender_permuta: 'Vender o permutar',
  menos_50k: 'Hasta USD 50.000',
  '50_100k': 'USD 50.000 – 100.000',
  '100_200k': 'USD 100.000 – 200.000',
  mas_200k: 'Más de USD 200.000',
  a_definir: 'A definir con Julián',
  casa: 'Casa',
  departamento: 'Departamento',
  lote: 'Lote / terreno',
  local: 'Local / comercial',
  otro: 'Otro',
  no_seguro: 'Sin definir',
  centro: 'Villa María centro',
  barrios: 'Barrios de Villa María',
  afueras: 'Countries / afueras',
  ya: 'Listo ahora',
  '1_3_meses': '1 a 3 meses',
  explorando: 'Explorando',
}

type Answers = Partial<Record<Step['id'], string>>

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5493534222575'

/* ------------------------------------------------------------------ */
/*  Componente                                                          */
/* ------------------------------------------------------------------ */

export default function Simulator() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [dir, setDir] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [waLink, setWaLink] = useState('')

  const total = STEPS.length
  const isForm = step === total
  const progress = Math.round(((isForm ? total : step) / total) * 100)

  const summary = useMemo(() => buildSummary(answers, name), [answers, name])

  function select(value: string) {
    const current = STEPS[step]
    setAnswers((prev) => ({ ...prev, [current.id]: value }))
    setDir(1)
    // Auto-avance con una pausa breve para que se vea el estado seleccionado
    window.setTimeout(() => setStep((s) => s + 1), 260)
  }

  function back() {
    setDir(-1)
    setStep((s) => Math.max(0, s - 1))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !phone.trim() || sending) return
    setSending(true)

    const waMessage = buildWhatsAppMessage(answers, name)
    const link = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waMessage)}`
    setWaLink(link)

    // Guardar en la base (no bloqueante para la experiencia)
    try {
      await fetch('/api/leads/qualify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          ...answers,
          summary,
        }),
      })
    } catch {
      /* si falla el guardado igual seguimos al handoff de WhatsApp */
    }

    setDone(true)
    setSending(false)
    // Abrir WhatsApp en nueva pestaña
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Card */}
      <div className="relative rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Glow superior */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-accent/20 blur-[90px]" />

        {/* Progress */}
        <div className="relative px-6 sm:px-8 pt-6">
          <div className="flex items-center justify-between text-xs text-white/50 mb-3">
            <span className="font-mono tracking-widest uppercase">
              {done ? 'Perfil listo' : isForm ? 'Último paso' : `${step + 1} / ${total}`}
            </span>
            <span className="font-mono">{done ? '100' : progress}%</span>
          </div>
          <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary-light to-accent"
              initial={false}
              animate={{ width: `${done ? 100 : progress}%` }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative px-6 sm:px-8 py-7 min-h-[420px] flex flex-col">
          <AnimatePresence mode="wait" custom={dir}>
            {done ? (
              <Success key="done" name={name} waLink={waLink} />
            ) : isForm ? (
              <FormStep
                key="form"
                dir={dir}
                name={name}
                phone={phone}
                setName={setName}
                setPhone={setPhone}
                onSubmit={submit}
                onBack={back}
                sending={sending}
                answers={answers}
              />
            ) : (
              <QuestionStep
                key={STEPS[step].id}
                dir={dir}
                step={STEPS[step]}
                selected={answers[STEPS[step].id]}
                onSelect={select}
                onBack={step > 0 ? back : undefined}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="text-center text-xs text-white/35 mt-4">
        Tus respuestas van directo a Julián. Sin spam, sin llamados automáticos.
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Sub-vistas                                                          */
/* ------------------------------------------------------------------ */

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
}

function QuestionStep({
  step,
  selected,
  onSelect,
  onBack,
  dir,
}: {
  step: Step
  selected?: string
  onSelect: (v: string) => void
  onBack?: () => void
  dir: number
}) {
  return (
    <motion.div
      custom={dir}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col h-full"
    >
      <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-2">{step.eyebrow}</p>
      <h3 className="text-white text-2xl sm:text-[26px] font-heading font-bold leading-tight mb-6">
        {step.question}
      </h3>

      <div className="grid grid-cols-1 gap-2.5">
        {step.options.map((opt) => {
          const active = selected === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              className={[
                'group flex items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-all duration-200',
                active
                  ? 'border-accent bg-accent/10 ring-1 ring-accent/60'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]',
              ].join(' ')}
            >
              <span
                className={[
                  'flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center [&_svg]:w-5 [&_svg]:h-5 transition-colors',
                  active ? 'bg-accent/20 text-accent' : 'bg-white/5 text-white/60 group-hover:text-white/80',
                ].join(' ')}
              >
                {opt.icon}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-white font-semibold text-[15px] leading-tight">{opt.label}</span>
                {opt.hint && <span className="block text-white/45 text-[13px] mt-0.5">{opt.hint}</span>}
              </span>
              <span
                className={[
                  'flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all',
                  active ? 'border-accent bg-accent text-primary' : 'border-white/20 text-transparent',
                ].join(' ')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3">
                  <path d="m5 12 5 5 9-11" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          )
        })}
      </div>

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mt-6 self-start text-white/45 hover:text-white/80 text-sm inline-flex items-center gap-1.5 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Atrás
        </button>
      )}
    </motion.div>
  )
}

function FormStep({
  name,
  phone,
  setName,
  setPhone,
  onSubmit,
  onBack,
  sending,
  answers,
  dir,
}: {
  name: string
  phone: string
  setName: (v: string) => void
  setPhone: (v: string) => void
  onSubmit: (e: React.FormEvent) => void
  onBack: () => void
  sending: boolean
  answers: Answers
  dir: number
}) {
  return (
    <motion.div
      custom={dir}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col h-full"
    >
      <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-2">Casi listo</p>
      <h3 className="text-white text-2xl sm:text-[26px] font-heading font-bold leading-tight mb-2">
        ¿A dónde te contacta Julián?
      </h3>
      <p className="text-white/50 text-sm mb-6">
        Dejá tu nombre y WhatsApp. Te responde en el día con una lectura de tu caso.
      </p>

      {/* Mini resumen del perfil */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(['objetivo', 'presupuesto', 'tipo', 'zona', 'plazo'] as const)
          .filter((k) => answers[k])
          .map((k) => (
            <span
              key={k}
              className="text-xs text-white/70 bg-white/[0.06] border border-white/10 rounded-full px-3 py-1"
            >
              {LABELS[answers[k] as string]}
            </span>
          ))}
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-3 mt-auto">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre"
          autoComplete="name"
          className="w-full rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-white/35 focus:border-accent/60"
          required
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="WhatsApp (ej: 353 4 000000)"
          autoComplete="tel"
          inputMode="tel"
          className="w-full rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-white/35 focus:border-accent/60"
          required
        />
        <button
          type="submit"
          disabled={sending || !name.trim() || !phone.trim()}
          className="group relative mt-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary-light to-accent px-6 py-4 font-semibold text-primary shadow-lg shadow-accent/20 transition-all hover:shadow-accent/40 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <>
              Recibir mi lectura
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </button>
      </form>

      <button
        type="button"
        onClick={onBack}
        className="mt-5 self-start text-white/45 hover:text-white/80 text-sm inline-flex items-center gap-1.5 transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Atrás
      </button>
    </motion.div>
  )
}

function Success({ name, waLink }: { name: string; waLink: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col items-center justify-center text-center h-full py-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 14 }}
        className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-light to-accent flex items-center justify-center mb-6"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-8 h-8 text-primary">
          <path d="m5 12 5 5 9-11" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>

      <h3 className="text-white text-2xl font-heading font-bold mb-2">
        Listo{name ? `, ${name.split(' ')[0]}` : ''} 👌
      </h3>
      <p className="text-white/55 text-[15px] max-w-sm mb-7">
        Tu perfil ya está en manos de Julián. Te abrimos WhatsApp con todo pre-cargado — solo tenés que
        apretar enviar.
      </p>

      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#25D366]/25 transition-transform hover:scale-[1.03]"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.34 0-4.508-.654-6.365-1.787l-.444-.267-3.07 1.03 1.03-3.07-.267-.444A9.955 9.955 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
        </svg>
        Abrir mi conversación
      </a>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Helpers de mensaje                                                  */
/* ------------------------------------------------------------------ */

function buildSummary(a: Answers, name: string): string {
  const parts = [
    `Objetivo: ${a.objetivo ? LABELS[a.objetivo] : '-'}`,
    `Presupuesto: ${a.presupuesto ? LABELS[a.presupuesto] : '-'}`,
    a.tipo ? `Tipo: ${LABELS[a.tipo]}` : null,
    a.zona ? `Zona: ${LABELS[a.zona]}` : null,
    a.plazo ? `Plazo: ${LABELS[a.plazo]}` : null,
  ].filter(Boolean)
  return `${name ? name + ' — ' : ''}${parts.join(' · ')}`
}

function buildWhatsAppMessage(a: Answers, name: string): string {
  const lines = [
    'Hola Julián! Armé mi perfil en tu web 👇',
    '',
    `🎯 Objetivo: ${a.objetivo ? LABELS[a.objetivo] : '-'}`,
    `💰 Presupuesto: ${a.presupuesto ? LABELS[a.presupuesto] : '-'}`,
    a.tipo ? `🏠 Tipo: ${LABELS[a.tipo]}` : null,
    a.zona ? `📍 Zona: ${LABELS[a.zona]}` : null,
    a.plazo ? `⏱️ Plazo: ${LABELS[a.plazo]}` : null,
    '',
    `Soy ${name || '...'}. ¿Coordinamos una charla?`,
  ].filter(Boolean)
  return lines.join('\n')
}
