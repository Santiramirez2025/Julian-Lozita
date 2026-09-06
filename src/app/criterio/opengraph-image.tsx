import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt = 'Las 12 preguntas antes de firmar — Julián Lozita, Escribano Público y Abogado'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Imagen de compartir. Se ve más veces que la propia página (se pega en
// comentarios de YouTube y en WhatsApp), así que tiene que renderizar SIEMPRE:
// no se cargan fuentes de marca externas para no arriesgar la generación.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #0A1A30 0%, #1E3A5F 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: '#00D4FF' }} />
          <div style={{ fontSize: 24, letterSpacing: 2, color: '#9FB3C8', textTransform: 'uppercase' }}>
            Guía práctica · Villa María, Córdoba
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 82, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            Las 12 preguntas
          </div>
          <div
            style={{
              fontSize: 82,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: '#00D4FF',
            }}
          >
            antes de firmar
          </div>
          <div style={{ marginTop: 26, fontSize: 34, color: '#C7D2DE' }}>
            Julián Lozita · Escribano Público y Abogado
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', fontSize: 30, color: '#9FB3C8' }}>
          julianlozita.com
        </div>
      </div>
    ),
    { ...size }
  )
}
