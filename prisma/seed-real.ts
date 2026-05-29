import { PrismaClient } from '@prisma/client'
import { slugify } from '../src/lib/utils'

const prisma = new PrismaClient()

type SeedProperty = {
  title: string
  propertyType: string
  neighborhood: string
  city: string
  address: string
  totalArea: number | null
  coveredArea: number | null
  bedrooms: number | null
  bathrooms: number | null
  garages: number | null
  price: number
  features: string[]
  images: string[]
  description: string
  acceptsPermuta?: boolean
  hasFinancing?: boolean
}

const properties: SeedProperty[] = [
  {
    title: 'Casa premium en Costa de Oro',
    propertyType: 'casa',
    neighborhood: 'Costa de Oro',
    city: 'Villa Nueva',
    address: 'Barrio Costa de Oro, Villa Nueva',
    totalArea: 1000,
    coveredArea: 400,
    bedrooms: 4,
    bathrooms: 4,
    garages: 2,
    price: 550000,
    acceptsPermuta: true,
    features: [
      'Garage doble con portón automático',
      'Loza radiante',
      'Aberturas símil madera Barengo con DVH',
    ],
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'],
    description:
      'Una propiedad de categoría en uno de los barrios más valorizados de Villa Nueva. Sobre un lote de 1.000 m² con 400 m² construidos, esta casa combina amplitud, terminaciones premium y una construcción pensada para durar: loza radiante en toda la vivienda, aberturas símil madera Barengo con doble vidrio hermético (DVH) y garage doble con portón automático.\n\nCon 4 dormitorios y 4 baños, el inmueble responde tanto a una familia que busca su casa definitiva como a quien evalúa una inversión de resguardo de valor en una zona de demanda sostenida y plusvalía comprobada. Costa de Oro es hoy uno de los desarrollos residenciales con mejor proyección de la región.\n\nLa operación admite parte en efectivo y parte en permuta, lo que abre alternativas para reorganizar activos sin descapitalizarse. Una oportunidad concreta para incorporar a tu patrimonio un bien de alta calidad constructiva y baja oferta en el mercado.',
  },
  {
    title: 'Casa 4 dormitorios en San Justo',
    propertyType: 'casa',
    neighborhood: 'San Justo',
    city: 'Villa María',
    address: 'Barrio San Justo, Villa María',
    totalArea: 450,
    coveredArea: 340,
    bedrooms: 4,
    bathrooms: 4,
    garages: null,
    price: 290000,
    features: [],
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'],
    description:
      'Casa de gran porte en barrio San Justo, una de las zonas más consolidadas y estables de Villa María. Con 450 m² de terreno y 340 m² construidos, ofrece una superficie generosa que hoy resulta difícil de encontrar a este valor dentro de la ciudad.\n\nSus 4 dormitorios y 4 baños la vuelven ideal para familias numerosas, pero también para quien busca un inmueble con buena renta potencial o sólido respaldo de capital. La consolidación del barrio y la escasez de lotes de esta dimensión sostienen su valor en el tiempo.\n\nA USD 290.000 representa una alternativa de inversión equilibrada: metros, ubicación y demanda. Una buena puerta de entrada para quien quiere posicionar capital en ladrillos dentro de una zona de bajo riesgo.',
  },
  {
    title: 'Casa céntrica 4 dormitorios',
    propertyType: 'casa',
    neighborhood: 'Centro',
    city: 'Villa María',
    address: 'Centro, Villa María',
    totalArea: 160,
    coveredArea: 240,
    bedrooms: 4,
    bathrooms: 4,
    garages: null,
    price: 240000,
    hasFinancing: true,
    features: ['Ubicación céntrica'],
    images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'],
    description:
      'Casa céntrica desarrollada en dos plantas, a pasos de los principales servicios, comercios e instituciones de Villa María. Sobre 160 m² de terreno suma 240 m² construidos, aprovechando la altura para ganar superficie sin resignar ubicación.\n\nCon 4 dormitorios y 4 baños, es una propiedad versátil: vivienda familiar, oficina profesional o inmueble de renta en una de las zonas de mayor circulación de la ciudad. La ubicación céntrica es, históricamente, el activo inmobiliario que mejor conserva su valor.\n\nUna ventaja clave: la operación admite financiación, lo que permite ingresar al inmueble sin inmovilizar todo el capital de una sola vez. Ideal para quien busca apalancar una inversión patrimonial con condiciones de pago flexibles.',
  },
  {
    title: 'Casa con pileta y luz natural',
    propertyType: 'casa',
    neighborhood: 'A consultar',
    city: 'Villa María',
    address: 'Villa María, Córdoba',
    totalArea: 485,
    coveredArea: 320,
    bedrooms: 3,
    bathrooms: 3,
    garages: null,
    price: 0,
    features: ['Pileta', 'Luz natural por la cantidad de aberturas'],
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'],
    description:
      'Casa con identidad propia en Villa María, pensada para quienes valoran la luz y los espacios abiertos. Sobre un lote de 485 m² con 320 m² construidos, su mayor distintivo es la cantidad y amplitud de aberturas, que llenan cada ambiente de luz natural durante todo el día.\n\nCuenta con 3 dormitorios, 3 baños y pileta, en una distribución cómoda que prioriza el confort y la calidad de vida. Es el tipo de propiedad que combina disfrute presente y resguardo de valor a futuro.\n\nPrecio a consultar: se analiza cada propuesta de manera personalizada según forma de pago y condiciones. Una oportunidad para quien busca una vivienda con carácter o un activo diferenciado dentro de su cartera.',
  },
  {
    title: 'Casa frente al río sobre Av. Costanera',
    propertyType: 'casa',
    neighborhood: 'Costanera',
    city: 'Villa María',
    address: 'Avenida Costanera, Villa María',
    totalArea: 300,
    coveredArea: 110,
    bedrooms: 2,
    bathrooms: 1,
    garages: null,
    price: 170000,
    features: ['Frente al río', 'Mejor ubicación de costanera'],
    images: ['https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80'],
    description:
      'Casa con la ubicación más codiciada de Villa María: frente al río, sobre Avenida Costanera. En 300 m² de terreno y 110 m² construidos, ofrece 2 dormitorios y 1 baño en un emplazamiento que, por definición, no se repite.\n\nEl verdadero valor de esta propiedad está en su localización. Los inmuebles sobre la costanera tienen oferta limitada y demanda permanente, lo que los convierte en uno de los activos de mayor plusvalía y mejor reventa de la ciudad.\n\nA USD 170.000 es una oportunidad de entrada a una zona premium con potencial de revalorización y, eventualmente, de desarrollo. Para el inversor, la consigna es clara: la ubicación es el factor que más protege el capital en el tiempo.',
  },
  {
    title: 'Departamento premium planta baja — Altos del Río',
    propertyType: 'departamento',
    neighborhood: 'Altos del Río',
    city: 'Villa María',
    address: 'Salomón Gornitz 3036, Torre Veneto (Torre 2), PB G',
    totalArea: null,
    coveredArea: 107,
    bedrooms: 2,
    bathrooms: 2,
    garages: null,
    price: 0,
    features: [
      'Patio con asador',
      '3 aires frío/calor',
      'Muebles empotrados',
      'Cortinas blackout',
      'Cerramientos',
      'Entorno natural verde y tranquilo',
    ],
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'],
    description:
      'Departamento premium en planta baja dentro del complejo Altos del Río, Torre Veneto. Con 107 m² cubiertos, 2 dormitorios y 2 baños, suma el plus de un patio propio con asador, una rareza en este tipo de unidades.\n\nSe entrega completo y listo para habitar: 3 equipos de aire frío/calor, muebles empotrados, cortinas blackout y cerramientos ya instalados. Todo en un entorno natural, verde y tranquilo, que combina la comodidad del departamento con la privacidad de una planta baja con expansión.\n\nPrecio a consultar, con distintas formas de pago a evaluar. Para quien busca un activo de uso inmediato o una renta de calidad en un complejo consolidado, es una alternativa difícil de igualar por equipamiento y ubicación.',
  },
  {
    title: 'Departamentos en Palermo Center — 1 y 2 dormitorios',
    propertyType: 'departamento',
    neighborhood: 'Palermo',
    city: 'Villa María',
    address: 'Edificio Palermo Center, Villa María',
    totalArea: null,
    coveredArea: null,
    bedrooms: null,
    bathrooms: null,
    garages: null,
    price: 0,
    features: ['Edificio exclusivo', 'Opciones de 1 y 2 dormitorios'],
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'],
    description:
      'Unidades a estrenar en Palermo Center, un edificio exclusivo en una de las zonas de mayor crecimiento de Villa María. Hay disponibilidad en tipologías de 1 y 2 dormitorios, pensadas tanto para vivienda como para inversión.\n\nLos departamentos a estrenar en edificios nuevos son hoy uno de los vehículos de inversión más buscados: ticket de entrada accesible, demanda de alquiler sostenida y revalorización a medida que se completa el desarrollo del barrio.\n\nPrecio a consultar según unidad, piso y forma de pago. Consultá por las opciones disponibles de 1 y 2 dormitorios: es el momento de posicionarse en un producto con liquidez y proyección dentro del mercado local.',
  },
]

async function main() {
  // Limpieza previa (idempotente — permite re-correr el script)
  await prisma.propertyScore.deleteMany({})
  await prisma.propertyEvent.deleteMany({})
  await prisma.property.deleteMany({})

  for (const p of properties) {
    const slug = slugify(p.title)
    await prisma.property.create({
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
        propertyType: p.propertyType,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        garages: p.garages,
        totalArea: p.totalArea,
        coveredArea: p.coveredArea,
        features: p.features,
        images: p.images,
        coverImage: p.images[0] ?? '',
        status: 'available',
        featured: true,
        published: true,
        acceptsPermuta: p.acceptsPermuta ?? false,
        hasFinancing: p.hasFinancing ?? false,
        urgentSale: false,
        negotiable: true,
        forBusiness: false,
        forPatrimony: false,
      },
    })
    console.log(`  + ${p.title}  →  /${slug}`)
  }

  const total = await prisma.property.count()
  console.log(`\nPropiedades creadas: ${total}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
