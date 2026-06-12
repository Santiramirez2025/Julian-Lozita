import { ReactNode } from 'react'

interface IPhoneFrameProps {
  children: ReactNode
  className?: string
}

/**
 * Marco visual iPhone 16 Pro. Aspect ratio 9:19.5.
 * El contenido (children) debe ser un elemento que llene 100% de su
 * contenedor (ej: <video class="absolute inset-0">).
 */
export default function IPhoneFrame({ children, className = '' }: IPhoneFrameProps) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[300px] sm:max-w-[340px] md:max-w-[380px] aspect-[9/19.5] ${className}`}
    >
      {/* Side buttons (decorative) */}
      <div className="absolute -left-[3px] top-[18%] w-[3px] h-[3.5%] bg-neutral-900 rounded-l-sm" aria-hidden="true" />
      <div className="absolute -left-[3px] top-[26%] w-[3px] h-[7%] bg-neutral-900 rounded-l-sm" aria-hidden="true" />
      <div className="absolute -left-[3px] top-[35%] w-[3px] h-[7%] bg-neutral-900 rounded-l-sm" aria-hidden="true" />
      <div className="absolute -right-[3px] top-[22%] w-[3px] h-[10%] bg-neutral-900 rounded-r-sm" aria-hidden="true" />

      {/* Outer body */}
      <div className="absolute inset-0 rounded-[2.5rem] sm:rounded-[3rem] bg-neutral-900 shadow-2xl shadow-black/30 p-[6px] sm:p-[7px]">
        {/* Bezel */}
        <div className="relative w-full h-full rounded-[2.2rem] sm:rounded-[2.7rem] bg-black overflow-hidden">
          {/* Screen */}
          <div className="absolute inset-0 overflow-hidden">{children}</div>

          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[35%] h-[18px] sm:h-[22px] bg-black rounded-full z-10 pointer-events-none" aria-hidden="true" />

          {/* Inner glass highlight (sutil) */}
          <div className="absolute inset-0 rounded-[2.2rem] sm:rounded-[2.7rem] pointer-events-none ring-1 ring-inset ring-white/5" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
