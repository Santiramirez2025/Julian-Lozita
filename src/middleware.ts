import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Rutas públicas ocultas mientras Julián carga el inventario.
// Se redirigen a la landing. El panel /admin y la API siguen activos.
const HIDDEN_PREFIXES = ['/propiedades', '/contacto']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // /guia -> /criterio (301). La URL se escucha en videos, se tipea mal.
  if (pathname === '/guia' || pathname.startsWith('/guia/')) {
    return NextResponse.redirect(new URL('/criterio', req.url), 301)
  }

  // Ocultar páginas públicas -> landing
  if (HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Proteger /admin/* excepto /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/propiedades/:path*', '/propiedades', '/contacto/:path*', '/contacto', '/guia', '/guia/:path*'],
}
