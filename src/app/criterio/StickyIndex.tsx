'use client'

import { useEffect, useState } from 'react'

interface IndexItem {
  id: string
  label: string
}

/**
 * Índice lateral pegajoso, solo en desktop (lg+). En mobile no se renderiza:
 * nada de menú flotante tapando el texto. La versión imprimible del índice va
 * aparte, al principio del documento (ver page.tsx, .criterio-print-index).
 */
export default function StickyIndex({ items }: { items: IndexItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0 }
    )
    items.forEach((it) => {
      const el = document.getElementById(it.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

  return (
    <nav aria-label="Índice de la guía" className="criterio-no-print text-sm">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-light mb-4">
        En esta guía
      </p>
      <ul className="space-y-1 border-l border-border">
        {items.map((it, i) => {
          const isActive = active === it.id
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={[
                  '-ml-px flex items-start gap-2 border-l-2 py-2 pl-4 pr-2 leading-snug transition-colors',
                  isActive
                    ? 'border-primary text-primary font-semibold'
                    : 'border-transparent text-text-light hover:text-text hover:border-border',
                ].join(' ')}
              >
                <span className="font-mono text-[11px] pt-0.5 tabular-nums opacity-70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{it.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
