/**
 * Fuente única de la guía "Las 12 preguntas antes de firmar".
 *
 * El texto es VERBATIM del documento original (guia_12_preguntas.md), firmado
 * por Julián Lozita (Escribano Público y Abogado). No editar el contenido acá:
 * si cambia la guía, cambia este archivo, y de acá sale tanto la página como el
 * JSON-LD (FAQPage) y la vista de impresión (PDF). Una sola fuente de verdad.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://julianlozita.com'

export const GUIA = {
  title: 'Las 12 preguntas antes de firmar',
  subtitle: 'Guía práctica para no comprar un problema',
  author: 'Julián Lozita',
  authorRole: 'Escribano Público y Abogado',
  location: 'Villa María, Córdoba',
  site: 'julianlozita.com',
  verified: 'Contenido verificado a septiembre de 2026.',
  // La cita que abre la guía (primer párrafo de "Por qué existe esta guía").
  openingQuote:
    'La mayoría de las operaciones inmobiliarias que salen mal no salen mal por el precio. Salen mal por algo que nadie preguntó a tiempo.',
} as const

/** Introducción — "Por qué existe esta guía" (verbatim). */
export const INTRO = {
  heading: 'Por qué existe esta guía',
  paragraphs: [
    'La mayoría de las operaciones inmobiliarias que salen mal no salen mal por el precio. Salen mal por algo que nadie preguntó a tiempo.',
    'Un embargo que aparece dos meses después de la seña. Una ampliación que nunca se declaró. Un lote donde no se puede construir lo que uno pensaba. Una escritura que se demora tres años porque hay un heredero que no firma.',
    'Ninguna de esas cosas es un imprevisto. Todas se pueden detectar antes, con la pregunta correcta hecha en el momento correcto.',
    'Estas son las doce. Están en orden: las primeras cinco se hacen antes de ofertar, las cuatro siguientes antes de señar, y las últimas tres antes de firmar la escritura.',
  ],
} as const

export interface Question {
  n: number
  question: string
  porque: string
  /** Solo la pregunta 9: bloque destacado sobre la derogación del ITI. */
  itiBlock?: string[]
  necesitas: string
  alarma: string
}

export interface Section {
  id: string
  /** Título como aparece en el documento. */
  title: string
  /** Etiqueta corta para el índice lateral. */
  navLabel: string
  questions: Question[]
}

export const SECTIONS: Section[] = [
  {
    id: 'ofertar',
    title: 'Antes de ofertar',
    navLabel: 'Antes de ofertar',
    questions: [
      {
        n: 1,
        question: '¿Quién figura como titular y es la misma persona que me está vendiendo?',
        porque:
          'Parece obvio y es el origen de una parte enorme de los problemas. Vende un hermano por otro, vende un apoderado con poder vencido, vende alguien que heredó pero todavía no inscribió a su nombre.',
        necesitas:
          'El título de propiedad, y que el nombre coincida exactamente con el DNI de quien firma. Si firma un apoderado, el poder vigente y con facultades para vender. Si hay más de un titular, todos tienen que estar.',
        alarma:
          '“El título lo tiene mi hermano, después te lo mando.” El título se ve antes, no después.',
      },
      {
        n: 2,
        question: '¿Qué dice el informe de dominio emitido esta semana?',
        porque:
          'Es el documento que dice la verdad sobre la propiedad: si tiene hipoteca, embargo, o si el titular está inhibido para disponer de sus bienes. Un informe de hace seis meses no sirve, porque un embargo se puede haber trabado ayer.',
        necesitas:
          'Informe de dominio actualizado del Registro General de la Provincia. Leelo entero, incluidas las anotaciones marginales.',
        alarma: 'Que te lo den vencido, o que te digan que “está todo limpio” sin mostrarlo.',
      },
      {
        n: 3,
        question: '¿Hay deudas de impuestos, tasas y servicios, y quién las paga?',
        porque:
          'El impuesto inmobiliario, la tasa municipal y algunos servicios siguen a la propiedad, no a la persona. Si la deuda no se cancela antes de escriturar, termina siendo tuya.',
        necesitas:
          'Libre deuda de impuesto inmobiliario provincial, tasa municipal y servicios. Y por escrito, en el boleto, quién se hace cargo de lo anterior a la posesión.',
        alarma:
          'Deuda que el vendedor promete cancelar “con lo que le pagues”. Eso se resuelve reteniendo el monto hasta que esté cancelado, no confiando.',
      },
      {
        n: 4,
        question: '¿La construcción está regularizada?',
        porque:
          'Ampliaciones sin declarar, quinchos que no figuran, un segundo piso que no existe en los planos. Regularizarlo después cuesta plata, tiempo y a veces no se puede. Y si el día de mañana querés vender con crédito hipotecario, el banco no lo va a tomar.',
        necesitas:
          'Planos aprobados que coincidan con lo que estás viendo. Si hay diferencias, quién las regulariza, con qué plazo y quién paga.',
        alarma:
          '“Eso lo hizo el anterior dueño, nunca tuvimos problema.” No haber tenido problema no es lo mismo que estar en regla.',
      },
      {
        n: 5,
        question: '¿Qué se puede construir ahí?',
        porque:
          'Vale sobre todo para lotes, pero también para casas que pensás ampliar. La zonificación municipal define superficie edificable, altura, retiros y usos permitidos. Dos lotes iguales en la misma cuadra pueden tener aprovechamientos distintos.',
        necesitas:
          'El certificado de uso de suelo o la consulta de zonificación en el municipio. Es un trámite corto y lo puede pedir cualquiera.',
        alarma: '“Ahí podés hacer lo que quieras.” Nunca es cierto.',
      },
    ],
  },
  {
    id: 'senar',
    title: 'Antes de señar',
    navLabel: 'Antes de señar',
    questions: [
      {
        n: 6,
        question: '¿Hace cuánto está publicada y a qué precio arrancó?',
        porque:
          'Es el dato más honesto del mercado y es gratis. Una propiedad que lleva ocho meses publicada y bajó dos veces te está diciendo exactamente cuánto margen hay. Una que salió hace tres semanas, otra cosa.',
        necesitas:
          'La fecha de publicación original y el historial de precio. Los portales lo muestran; también sirve buscar el mismo domicilio en avisos viejos.',
        alarma:
          'Que la republiquen como nueva para borrar el historial. Si el aviso es “nuevo” pero la foto tiene un auto modelo viejo en la puerta, ya sabés.',
      },
      {
        n: 7,
        question: '¿Qué operaciones cerradas hay en la zona?',
        porque:
          'El precio publicado es una aspiración. El precio escriturado es un hecho. Comparar contra publicaciones te deja siempre arriba del valor real.',
        necesitas:
          'Tres comparables: mismo barrio, superficie parecida, antigüedad parecida, y operaciones efectivamente cerradas en los últimos seis meses. Con tres tenés un rango. Con uno tenés una anécdota.',
        alarma: 'Que el único comparable que te muestren sea el más caro de la zona.',
      },
      {
        n: 8,
        question: '¿Cuál es el costo total de la operación, no el precio?',
        porque:
          'Al precio hay que sumarle honorarios de escribano, impuesto de sellos, comisión inmobiliaria e informes. Es una porción nada menor. Si estirás el presupuesto hasta el último peso para la compra, llegás a la escritura sin poder escriturar.',
        necesitas:
          'El número completo, por escrito, antes de comprometerte. Y quién paga cada cosa: el impuesto de sellos suele repartirse, la comisión depende del acuerdo, los honorarios de escribano los paga el comprador salvo pacto en contrario.',
        alarma: 'Que te den el precio y te digan “los gastos son mínimos”. Nunca son mínimos.',
      },
      {
        n: 9,
        question: '¿Qué me toca pagar el día que la venda?',
        porque:
          'Vender también cuesta, y el régimen cambió. Acá hay un error que se repite mucho:',
        itiBlock: [
          'El ITI ya no existe. El Impuesto a la Transferencia de Inmuebles fue derogado por el artículo 67 de la Ley 27.743, con vigencia desde el 8 de julio de 2024. Sin embargo, todavía circulan artículos y asesores que lo explican como vigente. Si alguien te dice que vas a pagar 1,5% de ITI, no está actualizado.',
          'Lo que sí sigue vigente es el impuesto cedular a las ganancias para inmuebles adquiridos a partir del 1° de enero de 2018, que grava el resultado de la operación, no el precio de venta. Para inmuebles adquiridos antes de esa fecha, hoy no corresponde ninguno de los dos.',
        ],
        necesitas:
          'Saber en qué fecha se adquirió la propiedad que estás comprando, porque eso define tu situación futura cuando la vendas.',
        alarma: 'Cualquier asesoramiento impositivo que no distinga entre antes y después de 2018.',
      },
    ],
  },
  {
    id: 'escriturar',
    title: 'Antes de escriturar',
    navLabel: 'Antes de escriturar',
    questions: [
      {
        n: 10,
        question: '¿Cuándo se escritura, y qué pasa entre el boleto y la escritura?',
        porque:
          'El boleto de compraventa no te hace dueño. Te da un derecho. Dueño sos con la escritura inscripta. Entre uno y otro momento puede pasar tiempo, y en ese lapso el riesgo existe.',
        necesitas:
          'Fecha cierta de escrituración en el boleto, con consecuencias si no se cumple. Posesión desde la firma del boleto si es posible. Firmas certificadas. Y la mayor parte del precio sin entregar hasta el momento de escriturar.',
        alarma: '“Escrituramos cuando se pueda.” Sin fecha no hay obligación exigible en la práctica.',
      },
      {
        n: 11,
        question: 'Si es en pozo: ¿qué garantía tengo y qué entregó antes esta desarrolladora?',
        porque:
          'En pozo estás pagando algo que todavía no existe. La única garantía real es la trayectoria de quien construye y la estructura jurídica del proyecto.',
        necesitas:
          'La figura legal del proyecto (fideicomiso, boleto, cesión), qué pasa si la obra se detiene, y direcciones concretas de al menos dos obras entregadas por la misma desarrolladora hace cinco años o más. Andá a verlas.',
        alarma:
          'Que solo te muestren renders. Los renders son todos iguales. Lo que diferencia a una desarrolladora es lo que quedó en pie.',
      },
      {
        n: 12,
        question: '¿A quién se la voy a vender dentro de diez años?',
        porque:
          'Es la pregunta que casi nadie se hace y la que más define el resultado. Una propiedad que solo le sirve a un comprador muy específico tarda años en venderse. Una que le sirve a mucha gente se vende cuando vos querés, no cuando aparece alguien.',
        necesitas:
          'Un perfil concreto de comprador futuro. Si no lo podés describir en una frase, todavía no sabés qué estás comprando.',
        alarma: '“Es única en la zona.” Lo único es difícil de comparar y difícil de vender.',
      },
    ],
  },
]

/** Sección final: "Tres cosas que casi todos tienen mal" + "Cómo usar esta guía". */
export const CLOSING = {
  id: 'cierre',
  navLabel: 'Tres cosas que casi todos tienen mal',
  tresCosas: {
    heading: 'Tres cosas que casi todos tienen mal',
    items: [
      {
        lead: 'El precio publicado no es el valor.',
        rest: 'En Argentina la publicación arranca por encima de lo que termina cerrando. Si tomás el precio publicado como referencia, vas a pagar de más siempre.',
      },
      {
        lead: 'No todos los metros valen lo mismo.',
        rest: 'El metro cubierto vale entero, el semicubierto alrededor de la mitad, el descubierto un tercio o menos. Comparar dos propiedades por superficie total es comparar cosas distintas.',
      },
      {
        lead: 'La construcción se deteriora, la tierra no.',
        rest: 'En el largo plazo lo que sostiene el valor es el suelo. Lo edificado se amortiza y necesita mantenimiento. A igual precio, la proporción entre uno y otro te dice cómo va a envejecer esa inversión.',
      },
    ],
  },
  comoUsar: {
    heading: 'Cómo usar esta guía',
    paragraphs: [
      'Imprimila o guardala en el teléfono. Llevala a la visita. Las preguntas están en el orden en que conviene hacerlas, y ninguna requiere que sepas de inmuebles: requieren que las hagas.',
      'Si en algún punto la respuesta no te cierra, no es que seas desconfiado. Es que el proceso está funcionando.',
    ],
  },
} as const

export const DISCLAIMER =
  'Esta guía es material informativo de orientación general. No constituye asesoramiento legal, impositivo ni notarial sobre un caso particular. Cada operación tiene circunstancias propias que deben analizarse individualmente. La normativa impositiva citada está verificada a septiembre de 2026 y puede modificarse.'

export const CONTACT = {
  name: 'Julián Lozita',
  role: 'Escribano Público y Abogado',
  address: 'Mendoza 677, Villa María, Córdoba',
  web: 'julianlozita.com',
  instagram: 'Instagram @julianlozita.ar',
} as const

/** Todas las preguntas en orden (1..12), para JSON-LD y navegación. */
export const ALL_QUESTIONS: Question[] = SECTIONS.flatMap((s) => s.questions)

/**
 * Respuesta completa de cada pregunta en texto plano, para el JSON-LD FAQPage.
 * Combina "por qué importa", "qué respuesta necesitás" y "señal de alarma"
 * (más el bloque del ITI en la pregunta 9).
 */
export function faqAnswer(q: Question): string {
  const parts = [q.porque]
  if (q.itiBlock) parts.push(...q.itiBlock)
  parts.push(`Qué respuesta necesitás: ${q.necesitas}`)
  parts.push(`Señal de alarma: ${q.alarma}`)
  return parts.join(' ')
}

/** Objeto JSON-LD FAQPage con las 12 preguntas. */
export function buildFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: GUIA.title,
    url: `${SITE_URL}/criterio`,
    mainEntity: ALL_QUESTIONS.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faqAnswer(q),
      },
    })),
  }
}
