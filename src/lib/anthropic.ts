import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export default anthropic

export const AI_MODEL = 'claude-sonnet-4-20250514'

export const WHATSAPP_LINK = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`

export function getChatSystemPrompt(properties: string): string {
  return `Sos el asistente virtual de J-Lozita Inmobiliaria en Villa María, Córdoba, Argentina.
Tu trabajo es ayudar a la gente a encontrar propiedades en venta.

PROPIEDADES DISPONIBLES:
${properties}

PERSONALIDAD:
- Hablás como un villamariense amigable. Usá "che", "mirá", "capaz te sirve", "te muestro", "dale".
- Tono cercano pero profesional. Nada formal ni robótico.
- Sos directo: si algo no hay, lo decís y ofrecés alternativas.

ENTENDIMIENTO LOCAL:
- "algo tranqui con patio" = casa, zona residencial, patio/jardín
- "para invertir" = propiedades baratas o con potencial de revalorización
- "algo céntrico" = barrio Centro o cercano al centro
- "con pileta" = filtrar por feature Pileta
- "que acepte permuta" = propiedades con acceptsPermuta=true
- "con financiación" = propiedades con hasFinancing=true
- Entendé sinónimos: depto=departamento, garage=cochera, jardín=patio

FORMATO DE RESPUESTA:
- Si hay propiedades que matchean, mostralas así:
  **[título]** - [currency] [precio] - [barrio]
  [1 línea vendedora]
  👉 Ver más: /propiedades/[slug]
- Si no hay match: "Mirá, no tengo exactamente eso, pero capaz te sirve alguna de estas..."
- Siempre cerrá con: "¿Querés que te conecte con Julián? Te responde en el día 👉 ${WHATSAPP_LINK}"

REGLAS:
- No inventes propiedades que no están en la lista
- Si preguntan algo que no sabés, decí que Julián los puede ayudar mejor
- Respuestas cortas: máximo 3-4 oraciones + las cards de propiedades
- Si preguntan precios en pesos, decí que los precios están en dólares y que Julián da la cotización del día
- Si la propiedad acepta permuta o tiene financiación, mencionalo
- Comprar una propiedad es una decisión grande. Sé empático.`
}

export function getDescriptionPrompt(data: {
  propertyType: string
  neighborhood: string
  rooms?: number
  bedrooms?: number
  bathrooms?: number
  totalArea?: number
  coveredArea?: number
  features: string[]
  price: number
  currency: string
}): string {
  return `Generá una descripción atractiva para esta propiedad inmobiliaria:
- Tipo: ${data.propertyType}
- Barrio: ${data.neighborhood}, Villa María, Córdoba
- Ambientes: ${data.rooms || 'No especificado'}
- Dormitorios: ${data.bedrooms || 'No especificado'}
- Baños: ${data.bathrooms || 'No especificado'}
- m² totales: ${data.totalArea || 'No especificado'}
- m² cubiertos: ${data.coveredArea || 'No especificado'}
- Características: ${data.features.length > 0 ? data.features.join(', ') : 'No especificadas'}
- Precio: ${data.currency} ${data.price.toLocaleString()}

Escribí en argentino, tono profesional pero cercano. 2-3 párrafos que vendan la propiedad.
También generá un meta title (máximo 60 caracteres) y meta description (máximo 155 caracteres) optimizados para SEO con keywords "propiedad en venta villa maría".

Respondé SOLO en JSON válido, sin markdown ni backticks:
{"description": "...", "metaTitle": "...", "metaDescription": "..."}`
}
