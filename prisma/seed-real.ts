import { PrismaClient } from '@prisma/client'
import { slugify } from '../src/lib/utils'

const prisma = new PrismaClient()

type SeedProperty = {
  title: string
  description: string
  price: number
  // Ubicación
  address: string
  neighborhood: string
  city: string
  latitude: number | null
  longitude: number | null
  // Características
  propertyType: string
  rooms: number | null
  bedrooms: number | null
  bathrooms: number | null
  garages: number | null
  totalArea: number | null
  coveredArea: number | null
  // Extras
  features: string[]
  // Badges comerciales
  acceptsPermuta: boolean
  hasFinancing: boolean
  // SEO
  metaTitle: string
  metaDescription: string
}

const properties: SeedProperty[] = [
  {
    title: 'Casa premium en Costa de Oro',
    description:
      'Una propiedad de categoría en uno de los barrios más valorizados de Villa Nueva. Sobre un lote de 1.000 m² con 400 m² construidos, esta casa combina amplitud, terminaciones premium y una construcción pensada para durar: losa radiante en toda la vivienda, aberturas símil madera Barengo con doble vidrio hermético (DVH) y garage doble con portón automático.\n\nCon 4 dormitorios y 4 baños, el inmueble responde tanto a una familia que busca su casa definitiva como a quien evalúa una inversión de resguardo de valor en una zona de demanda sostenida y plusvalía comprobada. Costa de Oro es hoy uno de los desarrollos residenciales con mejor proyección de la región.\n\nLa operación admite parte en efectivo y parte en permuta, lo que abre alternativas para reorganizar activos sin descapitalizarse. Una oportunidad concreta para incorporar a tu patrimonio un bien de alta calidad constructiva y baja oferta en el mercado.',
    price: 550000,
    address: 'Barrio Costa de Oro, Villa Nueva, Córdoba',
    neighborhood: 'Costa de Oro',
    city: 'Villa Nueva',
    latitude: null,
    longitude: null,
    propertyType: 'casa',
    rooms: 6,
    bedrooms: 4,
    bathrooms: 4,
    garages: 2,
    totalArea: 1000,
    coveredArea: 400,
    features: [
      'Garage doble con portón automático',
      'Losa radiante',
      'Aberturas símil madera Barengo con DVH',
    ],
    acceptsPermuta: true,
    hasFinancing: false,
    metaTitle: 'Casa premium Costa de Oro | Villa Nueva | J-Lozita',
    metaDescription:
      'Casa de 400m² en Costa de Oro, Villa Nueva. 4 dormitorios, losa radiante, DVH. Acepta permuta. Asesoramiento patrimonial.',
  },
  {
    title: 'Casa 4 dormitorios en San Justo',
    description:
      'Casa de gran porte en barrio San Justo, una de las zonas más consolidadas y estables de Villa María. Con 450 m² de terreno y 340 m² construidos, ofrece una superficie generosa que hoy resulta difícil de encontrar a este valor dentro de la ciudad.\n\nSus 4 dormitorios y 4 baños la vuelven ideal para familias numerosas, pero también para quien busca un inmueble con buena renta potencial o sólido respaldo de capital. La consolidación del barrio y la escasez de lotes de esta dimensión sostienen su valor en el tiempo.\n\nA USD 290.000 representa una alternativa de inversión equilibrada: metros, ubicación y demanda. Una buena puerta de entrada para quien quiere posicionar capital en ladrillos dentro de una zona de bajo riesgo.',
    price: 290000,
    address: 'Barrio San Justo, Villa María, Córdoba',
    neighborhood: 'San Justo',
    city: 'Villa María',
    latitude: null,
    longitude: null,
    propertyType: 'casa',
    rooms: 6,
    bedrooms: 4,
    bathrooms: 4,
    garages: 0,
    totalArea: 450,
    coveredArea: 340,
    features: [],
    acceptsPermuta: false,
    hasFinancing: false,
    metaTitle: 'Casa 4 dormitorios San Justo | Villa María | J-Lozita',
    metaDescription:
      'Casa de 340m² en San Justo, Villa María. 4 dormitorios, 4 baños, 450m² de terreno. Zona consolidada.',
  },
  {
    title: 'Casa céntrica 4 dormitorios',
    description:
      'Casa céntrica desarrollada en dos plantas, a pasos de los principales servicios, comercios e instituciones de Villa María. Sobre 160 m² de terreno suma 240 m² construidos, aprovechando la altura para ganar superficie sin resignar ubicación.\n\nCon 4 dormitorios y 4 baños, es una propiedad versátil: vivienda familiar, oficina profesional o inmueble de renta en una de las zonas de mayor circulación de la ciudad. La ubicación céntrica es, históricamente, el activo que mejor conserva su valor a lo largo del tiempo.\n\nUna ventaja clave: la operación admite financiación, lo que permite ingresar al inmueble sin inmovilizar todo el capital de una sola vez. Ideal para quien busca apalancar una inversión patrimonial con condiciones de pago flexibles.',
    price: 240000,
    address: 'Centro, Villa María, Córdoba',
    neighborhood: 'Centro',
    city: 'Villa María',
    latitude: null,
    longitude: null,
    propertyType: 'casa',
    rooms: 5,
    bedrooms: 4,
    bathrooms: 4,
    garages: 0,
    totalArea: 160,
    coveredArea: 240,
    features: ['Ubicación céntrica'],
    acceptsPermuta: false,
    hasFinancing: true,
    metaTitle: 'Casa céntrica 4 dormitorios | Villa María | J-Lozita',
    metaDescription:
      'Casa céntrica en Villa María. 240m² construidos, 4 dormitorios, acepta financiación. Ubicación estratégica.',
  },
  {
    title: 'Casa con pileta y luz natural',
    description:
      'Casa con identidad propia en Villa María, pensada para quienes valoran la luz y los espacios abiertos. Sobre un lote de 485 m² con 320 m² construidos, su mayor distintivo es la cantidad y amplitud de aberturas, que llenan cada ambiente de luz natural durante todo el día.\n\nCuenta con 3 dormitorios, 3 baños y pileta, en una distribución cómoda que prioriza el confort y la calidad de vida. Es el tipo de propiedad que combina disfrute presente y resguardo de valor a futuro.\n\nPrecio a consultar: se analiza cada propuesta de manera personalizada según forma de pago y condiciones. Una oportunidad para quien busca una vivienda con carácter o un activo diferenciado dentro de su cartera.',
    price: 0,
    address: 'Villa María, Córdoba',
    neighborhood: 'Villa María',
    city: 'Villa María',
    latitude: null,
    longitude: null,
    propertyType: 'casa',
    rooms: 5,
    bedrooms: 3,
    bathrooms: 3,
    garages: 0,
    totalArea: 485,
    coveredArea: 320,
    features: ['Pileta', 'Luz natural por la cantidad de aberturas', 'Aberturas amplias'],
    acceptsPermuta: false,
    hasFinancing: false,
    metaTitle: 'Casa con pileta Villa María | Precio a consultar',
    metaDescription:
      'Casa con pileta en Villa María. 485m² terreno, 320m² construidos, 3 dormitorios. Luz natural excepcional. Consultar.',
  },
  {
    title: 'Casa frente al río sobre Av. Costanera',
    description:
      'Casa con la ubicación más codiciada de Villa María: frente al río, sobre Avenida Costanera. En 300 m² de terreno y 110 m² construidos, ofrece 2 dormitorios y 1 baño en un emplazamiento que, por definición, no se repite.\n\nEl verdadero valor de esta propiedad está en su localización. Los inmuebles sobre la costanera tienen oferta limitada y demanda permanente, lo que los convierte en uno de los activos de mayor plusvalía y mejor reventa de la ciudad.\n\nA USD 170.000 es una oportunidad de entrada a una zona premium con potencial de revalorización y, eventualmente, de desarrollo. Para el inversor, la consigna es clara: la ubicación es el factor que más protege el capital a lo largo del tiempo.',
    price: 170000,
    address: 'Avenida Costanera, Villa María, Córdoba',
    neighborhood: 'Costanera',
    city: 'Villa María',
    latitude: null,
    longitude: null,
    propertyType: 'casa',
    rooms: 3,
    bedrooms: 2,
    bathrooms: 1,
    garages: 0,
    totalArea: 300,
    coveredArea: 110,
    features: ['Frente al río', 'Sobre Av. Costanera', 'Mejor ubicación de costanera'],
    acceptsPermuta: false,
    hasFinancing: false,
    metaTitle: 'Casa frente al río Costanera | Villa María | J-Lozita',
    metaDescription:
      'Casa sobre Av. Costanera con vista al río. 300m² terreno, 2 dormitorios. Mejor ubicación de Villa María.',
  },
  {
    title: 'Departamento premium planta baja — Altos del Río',
    description:
      'Departamento premium en planta baja dentro del complejo Altos del Río, Torre Veneto. Con 107 m² cubiertos, 2 dormitorios y 2 baños, suma el plus de un patio propio con asador, una rareza en este tipo de unidades.\n\nSe entrega completo y listo para habitar: 3 equipos de aire frío/calor, muebles empotrados, cortinas blackout y cerramientos ya instalados. Todo en un entorno natural, verde y tranquilo, que combina la comodidad del departamento con la privacidad de una planta baja con expansión.\n\nPrecio a consultar, con distintas formas de pago a evaluar. Para quien busca un activo de uso inmediato o una renta de calidad en un complejo consolidado, es una alternativa difícil de igualar por equipamiento y ubicación.',
    price: 0,
    address: 'Salomón Gornitz 3036, Torre Veneto (Torre 2), PB G, Villa María',
    neighborhood: 'Altos del Río',
    city: 'Villa María',
    latitude: null,
    longitude: null,
    propertyType: 'departamento',
    rooms: 3,
    bedrooms: 2,
    bathrooms: 2,
    garages: 0,
    totalArea: 107,
    coveredArea: 107,
    features: [
      'Patio con asador',
      '3 aires frío/calor',
      'Muebles empotrados',
      'Cortinas blackout',
      'Cerramientos',
      'Planta baja',
      'Entorno natural verde y tranquilo',
    ],
    acceptsPermuta: false,
    hasFinancing: false,
    metaTitle: 'Depto premium Altos del Río | Villa María | J-Lozita',
    metaDescription:
      'Departamento PB con patio en Altos del Río. 107m², 2 dormitorios, amueblado, aires. Entorno verde. Consultar.',
  },
  {
    title: 'Departamentos en Palermo Center — 1 y 2 dormitorios',
    description:
      'Unidades a estrenar en Palermo Center, un edificio exclusivo en una de las zonas de mayor crecimiento de Villa María. Hay disponibilidad en tipologías de 1 y 2 dormitorios, pensadas tanto para vivienda como para inversión.\n\nLos departamentos a estrenar en edificios nuevos son hoy uno de los vehículos de inversión más buscados: ticket de entrada accesible, demanda de alquiler sostenida y revalorización a medida que se completa el desarrollo del barrio.\n\nPrecio a consultar según unidad, piso y forma de pago. Consultá por las opciones disponibles de 1 y 2 dormitorios: es el momento de posicionarse en un producto con liquidez y proyección dentro del mercado local.',
    price: 0,
    address: 'Edificio Palermo Center, Villa María, Córdoba',
    neighborhood: 'Palermo',
    city: 'Villa María',
    latitude: null,
    longitude: null,
    propertyType: 'departamento',
    rooms: 0,
    bedrooms: 0,
    bathrooms: 0,
    garages: 0,
    totalArea: 0,
    coveredArea: 0,
    features: ['Edificio nuevo', 'Opciones de 1 y 2 dormitorios'],
    acceptsPermuta: false,
    hasFinancing: false,
    metaTitle: 'Deptos Palermo Center | Villa María | J-Lozita',
    metaDescription:
      'Departamentos nuevos en Palermo Center, Villa María. 1 y 2 dormitorios. Consultar disponibilidad y precios.',
  },
  {
    title: 'Casa premium amoblada en Costa de Oro',
    description:
      'Casa premium en Costa de Oro, Villa Nueva, entregada amoblada con equipamiento de categoría. Sobre un lote de 450 m² con 260 m² construidos, suma 3 dormitorios en suite con vestidor, cocina integrada, living comedor, galería y cochera doble abierta. Una distribución pensada para confort diario y calidad de vida.\n\nEl valor diferencial está en el amoblamiento: la propiedad se entrega lista para habitar o para poner en renta sin inversión adicional en muebles ni equipamiento. Ese ahorro inicial, sumado a las terminaciones premium, la convierte en una alternativa eficiente para quien busca optimizar el capital sin demorar la operación.\n\nCosta de Oro consolida su posición como uno de los desarrollos residenciales de mayor plusvalía y demanda de Villa Nueva. A USD 330.000, la propuesta combina ubicación, calidad constructiva y un activo de uso inmediato — tres condiciones difíciles de encontrar juntas en el mercado actual.',
    price: 330000,
    address: 'Barrio Costa de Oro, Villa Nueva, Córdoba',
    neighborhood: 'Costa de Oro',
    city: 'Villa Nueva',
    latitude: null,
    longitude: null,
    propertyType: 'casa',
    rooms: 5,
    bedrooms: 3,
    bathrooms: 3,
    garages: 2,
    totalArea: 450,
    coveredArea: 260,
    features: [
      'Dormitorios en suite con vestidor',
      'Amoblamiento premium incluido',
      'Cochera doble abierta',
      'Cocina integrada',
      'Living comedor',
      'Galería',
      'Calidad premium',
    ],
    acceptsPermuta: false,
    hasFinancing: false,
    metaTitle: 'Casa amoblada Costa de Oro | Villa Nueva | J-Lozita',
    metaDescription:
      'Casa premium amoblada en Costa de Oro, Villa Nueva. 260m² construidos, 3 suites con vestidor, cochera doble. USD 330.000.',
  },
]

async function main() {
  // Limpieza previa idempotente (permite re-correr sin chocar con slugs únicos)
  await prisma.propertyScore.deleteMany({})
  await prisma.propertyEvent.deleteMany({})
  await prisma.property.deleteMany({})

  const created: { title: string; slug: string; price: number; neighborhood: string }[] = []

  for (const p of properties) {
    const slug = slugify(p.title)
    const c = await prisma.property.create({
      data: {
        title: p.title,
        slug,
        description: p.description,
        price: p.price,
        currency: 'USD',
        address: p.address,
        neighborhood: p.neighborhood,
        city: p.city,
        province: 'Córdoba',
        latitude: p.latitude,
        longitude: p.longitude,
        propertyType: p.propertyType,
        rooms: p.rooms,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        garages: p.garages,
        totalArea: p.totalArea,
        coveredArea: p.coveredArea,
        features: p.features,
        images: [],
        coverImage: '',
        status: 'available',
        featured: true,
        published: true,
        acceptsPermuta: p.acceptsPermuta,
        hasFinancing: p.hasFinancing,
        urgentSale: false,
        negotiable: true,
        forBusiness: false,
        forPatrimony: false,
        metaTitle: p.metaTitle,
        metaDescription: p.metaDescription,
      },
    })
    created.push({ title: c.title, slug: c.slug, price: c.price, neighborhood: c.neighborhood })
  }

  console.log('\nPropiedades creadas:\n')
  for (const c of created) {
    const priceStr = c.price === 0 ? 'A consultar' : `USD ${c.price.toLocaleString('es-AR')}`
    console.log(`• ${c.title}`)
    console.log(`    slug:    ${c.slug}`)
    console.log(`    precio:  ${priceStr}`)
    console.log(`    barrio:  ${c.neighborhood}`)
    console.log('')
  }

  const total = await prisma.property.count()
  console.log(`Total en base: ${total}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
