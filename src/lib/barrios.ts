// Lista centralizada de barrios de Villa María y Villa Nueva
// Para agregar/eliminar un barrio, modificá este archivo y se actualiza en toda la web.

export interface Barrio {
  slug: string
  name: string
  city: 'Villa María' | 'Villa Nueva'
}

export const barriosVillaMaria: Barrio[] = [
  { slug: 'doctor-ramon-carrillo', name: 'Doctor Ramón Carrillo', city: 'Villa María' },
  { slug: 'parque-norte', name: 'Parque Norte', city: 'Villa María' },
  { slug: 'belgrano', name: 'Belgrano', city: 'Villa María' },
  { slug: 'trinitarios', name: 'Trinitarios', city: 'Villa María' },
  { slug: 'la-calera', name: 'La Calera', city: 'Villa María' },
  { slug: 'almirante-brown', name: 'Almirante Brown', city: 'Villa María' },
  { slug: 'florentino-ameghino', name: 'Florentino Ameghino', city: 'Villa María' },
  { slug: 'presidente-saenz-pena', name: 'Presidente Sáenz Peña', city: 'Villa María' },
  { slug: 'mariano-moreno', name: 'Mariano Moreno', city: 'Villa María' },
  { slug: 'centro-norte', name: 'Centro Norte', city: 'Villa María' },
  { slug: 'centro-oeste', name: 'Centro Oeste', city: 'Villa María' },
  { slug: 'centro-este', name: 'Centro Este', city: 'Villa María' },
  { slug: 'centro-sur', name: 'Centro Sur', city: 'Villa María' },
  { slug: 'general-guemes', name: 'General Güemes', city: 'Villa María' },
  { slug: 'general-paz', name: 'General Paz', city: 'Villa María' },
  { slug: 'palermo', name: 'Palermo', city: 'Villa María' },
  { slug: 'domingo-faustino-sarmiento', name: 'Domingo Faustino Sarmiento', city: 'Villa María' },
  { slug: 'santa-ana', name: 'Santa Ana', city: 'Villa María' },
  { slug: 'rivadavia', name: 'Rivadavia', city: 'Villa María' },
]

export const barriosVillaNueva: Barrio[] = [
  { slug: 'aguas-claras', name: 'Aguas Claras', city: 'Villa Nueva' },
  { slug: 'costa-de-oro', name: 'Costa de Oro', city: 'Villa Nueva' },
  { slug: 'prado-espanol', name: 'Prado Español', city: 'Villa Nueva' },
  { slug: 'las-lilas', name: 'Las Lilas', city: 'Villa Nueva' },
  { slug: 'las-rosas', name: 'Las Rosas', city: 'Villa Nueva' },
  { slug: 'los-algarrobos', name: 'Los Algarrobos', city: 'Villa Nueva' },
  { slug: 'masterplan', name: 'Masterplan', city: 'Villa Nueva' },
  { slug: 'la-reserva', name: 'La Reserva', city: 'Villa Nueva' },
  { slug: 'golf', name: 'Golf', city: 'Villa Nueva' },
  { slug: 'centro-villa-nueva', name: 'Centro', city: 'Villa Nueva' },
]

// Combined list for selects, filters, etc.
export const allBarrios: Barrio[] = [...barriosVillaMaria, ...barriosVillaNueva]

// Names only (for autocomplete suggestions in form)
export const barrioNames: string[] = allBarrios.map((b) => b.name)

// Find a barrio by name (case-insensitive, accent-insensitive)
export function findBarrio(name: string): Barrio | undefined {
  const normalize = (s: string) =>
    s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
  const target = normalize(name)
  return allBarrios.find((b) => normalize(b.name) === target)
}
