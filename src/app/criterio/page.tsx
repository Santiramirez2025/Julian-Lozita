import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import StickyIndex from './StickyIndex'
import CaptureForm from './CaptureForm'
import {
  GUIA,
  INTRO,
  SECTIONS,
  CLOSING,
  DISCLAIMER,
  CONTACT,
  buildFaqJsonLd,
  type Question,
} from './data'

export const metadata: Metadata = {
  title: 'Las 12 preguntas antes de firmar',
  description:
    'Guía gratuita de Julián Lozita, Escribano Público y Abogado (Villa María, Córdoba): las 12 preguntas que tenés que hacer antes de ofertar, señar y escriturar una propiedad. Verificada a septiembre de 2026.',
  alternates: { canonical: '/criterio' },
  openGraph: {
    type: 'article',
    url: '/criterio',
    title: 'Las 12 preguntas antes de firmar',
    description:
      'Las 12 preguntas que tenés que hacer antes de ofertar, señar y escriturar. Por Julián Lozita, Escribano Público y Abogado.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Las 12 preguntas antes de firmar',
    description:
      'Las 12 preguntas que tenés que hacer antes de ofertar, señar y escriturar una propiedad.',
  },
}

const indexItems = [
  ...SECTIONS.map((s) => ({ id: s.id, label: s.navLabel })),
  { id: CLOSING.id, label: CLOSING.navLabel },
]

/* --- Piezas de UI ---------------------------------------------------------- */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-light">
      {children}
    </p>
  )
}

function ItiBlock({ paragraphs }: { paragraphs: string[] }) {
  const LEAD = 'El ITI ya no existe.'
  return (
    <aside className="criterio-iti my-5 rounded-2xl border border-accent/40 bg-primary p-5 sm:p-6 text-white shadow-lg shadow-primary/20">
      <p className="mb-3 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
          <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Actualización normativa
      </p>
      {paragraphs.map((p, i) => (
        <p key={i} className={i === 0 ? 'leading-relaxed' : 'mt-3 leading-relaxed text-white/85'}>
          {i === 0 && p.startsWith(LEAD) ? (
            <>
              <strong className="text-accent">{LEAD}</strong>
              {p.slice(LEAD.length)}
            </>
          ) : (
            p
          )}
        </p>
      ))}
    </aside>
  )
}

function QuestionCard({ q }: { q: Question }) {
  return (
    <article
      id={`pregunta-${q.n}`}
      className="criterio-question scroll-mt-24 rounded-3xl border border-border bg-white p-6 sm:p-8"
    >
      <div className="flex items-start gap-4">
        <span className="criterio-qnum flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary font-heading text-lg font-bold text-white">
          {q.n}
        </span>
        <h3 className="pt-1 font-heading text-xl font-bold leading-snug text-text sm:text-2xl">
          {q.question}
        </h3>
      </div>

      <div className="mt-5 space-y-4 sm:pl-14">
        <div>
          <SectionLabel>Por qué importa</SectionLabel>
          <p className="mt-1.5 text-[17px] leading-relaxed text-text/90">{q.porque}</p>
        </div>

        {q.itiBlock && <ItiBlock paragraphs={q.itiBlock} />}

        <div>
          <SectionLabel>Qué respuesta necesitás</SectionLabel>
          <p className="mt-1.5 text-[17px] leading-relaxed text-text/90">{q.necesitas}</p>
        </div>

        <div className="criterio-alarma rounded-2xl border border-sold/30 bg-sold/[0.06] p-4">
          <p className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-sold">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M12 9v4m0 4h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.42 0Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Señal de alarma
          </p>
          <p className="mt-1.5 text-[17px] leading-relaxed text-text/90">{q.alarma}</p>
        </div>
      </div>
    </article>
  )
}

/* --- Página ---------------------------------------------------------------- */

export default function CriterioPage() {
  const faqJsonLd = buildFaqJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="criterio-no-print">
        <Navbar />
      </div>

      <main className="criterio-page bg-bg text-text">
        {/* Hero */}
        <header className="relative overflow-hidden bg-[#07070C] pt-28 pb-16 sm:pt-32 sm:pb-20">
          <div className="pointer-events-none absolute -top-40 -left-32 h-[32rem] w-[32rem] rounded-full bg-primary/25 blur-[130px]" />
          <div className="pointer-events-none absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-[130px]" />

          <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {GUIA.verified}
            </p>

            <h1 className="font-heading text-[2.25rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl">
              {GUIA.title}
            </h1>
            <p className="mt-4 text-lg text-white/60 sm:text-xl">{GUIA.subtitle}</p>

            <blockquote className="mt-8 border-l-2 border-accent/60 pl-4 text-[17px] italic leading-relaxed text-white/80 sm:text-lg">
              {GUIA.openingQuote}
            </blockquote>

            <div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3 pr-6 backdrop-blur-xl">
              <span className="block h-14 w-14 overflow-hidden rounded-xl ring-1 ring-white/15">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/julian.jpg" alt="Julián Lozita" className="h-full w-full object-cover" />
              </span>
              <span>
                <span className="block font-heading text-base font-bold leading-tight text-white">
                  {GUIA.author}
                </span>
                <span className="mt-0.5 flex items-center gap-1.5 text-sm font-medium text-accent">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                    <path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {GUIA.authorRole}
                </span>
              </span>
            </div>
          </div>
        </header>

        {/* Índice imprimible (solo en PDF) */}
        <div className="criterio-print-index" aria-hidden="true">
          <h2>Contenido</h2>
          <ol>
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <strong>{s.title}</strong>
                <ol>
                  {s.questions.map((q) => (
                    <li key={q.n}>{q.question}</li>
                  ))}
                </ol>
              </li>
            ))}
            <li>
              <strong>{CLOSING.tresCosas.heading}</strong>
            </li>
          </ol>
        </div>

        {/* Cuerpo: índice pegajoso (desktop) + contenido */}
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
          <aside className="criterio-no-print hidden lg:block">
            <div className="sticky top-24">
              <StickyIndex items={indexItems} />
            </div>
          </aside>

          <div className="min-w-0">
            {/* Intro */}
            <section className="mx-auto max-w-2xl">
              <h2 className="font-heading text-2xl font-bold text-text sm:text-3xl">{INTRO.heading}</h2>
              <div className="mt-4 space-y-4">
                {INTRO.paragraphs.map((p, i) => (
                  <p key={i} className="text-[17px] leading-relaxed text-text/90">
                    {p}
                  </p>
                ))}
              </div>
            </section>

            {/* Secciones con preguntas */}
            {SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24 pt-14">
                <div className="mx-auto max-w-2xl">
                  <h2 className="font-heading text-[1.75rem] font-extrabold uppercase tracking-tight text-primary sm:text-3xl">
                    {section.title}
                  </h2>
                </div>
                <div className="mx-auto mt-6 max-w-2xl space-y-5">
                  {section.questions.map((q) => (
                    <QuestionCard key={q.n} q={q} />
                  ))}
                </div>
              </section>
            ))}

            {/* Cierre: tres cosas + cómo usar */}
            <section id={CLOSING.id} className="scroll-mt-24 pt-14">
              <div className="mx-auto max-w-2xl">
                <h2 className="font-heading text-[1.75rem] font-extrabold uppercase tracking-tight text-primary sm:text-3xl">
                  {CLOSING.tresCosas.heading}
                </h2>
                <div className="mt-6 space-y-4">
                  {CLOSING.tresCosas.items.map((item, i) => (
                    <div key={i} className="criterio-question rounded-2xl border border-border bg-white p-5 sm:p-6">
                      <p className="text-[17px] leading-relaxed text-text/90">
                        <strong className="font-semibold text-text">{item.lead}</strong> {item.rest}
                      </p>
                    </div>
                  ))}
                </div>

                <h2 className="mt-14 font-heading text-2xl font-bold text-text sm:text-3xl">
                  {CLOSING.comoUsar.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {CLOSING.comoUsar.paragraphs.map((p, i) => (
                    <p key={i} className="text-[17px] leading-relaxed text-text/90">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Captura */}
        <section className="criterio-no-print px-5 pb-16 sm:px-8">
          <div className="relative mx-auto max-w-xl overflow-hidden rounded-[28px] border border-white/10 bg-[#07070C] p-7 sm:p-9">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/20 blur-[90px]" />
            <div className="relative">
              <h2 className="font-heading text-2xl font-bold leading-tight text-white sm:text-[28px]">
                Descargalo en PDF para llevarlo a la visita
              </h2>
              <p className="mt-2 mb-7 text-[15px] text-white/55">
                Dejá tu nombre y email y te la mandamos. La abrís en el teléfono o la imprimís para
                tener las 12 preguntas a mano cuando vayas a ver la propiedad.
              </p>
              <CaptureForm />
            </div>
          </div>
        </section>

        {/* Disclaimer legal — completo y legible */}
        <section className="border-t border-border bg-white px-5 py-12 sm:px-8">
          <div className="mx-auto max-w-2xl">
            <SectionLabel>Aviso legal</SectionLabel>
            <p className="mt-2 text-[15px] leading-relaxed text-text/80">{DISCLAIMER}</p>
            <div className="mt-6 border-t border-border pt-6 text-[15px] leading-relaxed text-text/80">
              <p className="font-heading font-bold text-text">
                {CONTACT.name} · {CONTACT.role}
              </p>
              <p>{CONTACT.address}</p>
              <p>
                {CONTACT.web} · {CONTACT.instagram}
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Pie de impresión (solo en PDF) */}
      <div className="criterio-print-footer" aria-hidden="true">
        {GUIA.site}/criterio · {GUIA.verified}
      </div>

      <div className="criterio-no-print">
        <Footer />
      </div>
    </>
  )
}
