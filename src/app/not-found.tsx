import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-6xl font-heading font-extrabold text-primary/20 mb-4">404</p>
        <h1 className="text-2xl font-heading font-bold text-text mb-2">
          Página no encontrada
        </h1>
        <p className="text-text-light mb-8">
          La página que buscás no existe o fue eliminada.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white font-semibold hover:bg-primary-light transition-colors"
        >
          ← Volver al inicio
        </Link>
      </div>
    </div>
  )
}
