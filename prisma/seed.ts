import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  await prisma.user.upsert({
    where: { email: 'julian@julianlozita.com' },
    update: {},
    create: {
      email: 'julian@julianlozita.com',
      password: hashedPassword,
      name: 'Julián Lozita',
    },
  })

  // Create sample properties
  const properties = [
    {
      title: 'Casa 3 ambientes en Barrio Norte',
      slug: 'casa-3-amb-barrio-norte',
      description: 'Hermosa casa de 3 ambientes ubicada en el corazón de Barrio Norte, Villa María. Cuenta con living-comedor amplio, cocina equipada, 2 dormitorios luminosos y un baño completo. El patio trasero con quincho es ideal para disfrutar en familia. Cochera cubierta para un vehículo. Excelente estado de conservación y lista para habitar.',
      price: 85000,
      currency: 'USD',
      address: 'Av. Sabattini 1234',
      neighborhood: 'Barrio Norte',
      propertyType: 'casa',
      rooms: 3,
      bedrooms: 2,
      bathrooms: 1,
      garages: 1,
      totalArea: 220,
      coveredArea: 110,
      features: ['Quincho', 'Patio', 'Cochera', 'Gas natural', 'Agua corriente'],
      images: [
        'https://res.cloudinary.com/demo/image/upload/v1/real-estate/house1.jpg',
      ],
      coverImage: 'https://res.cloudinary.com/demo/image/upload/v1/real-estate/house1.jpg',
      status: 'available',
      featured: true,
      published: true,
      metaTitle: 'Casa 3 Ambientes Barrio Norte | J-Lozita Villa María',
      metaDescription: 'Casa en venta en Barrio Norte, Villa María. 3 ambientes, quincho, patio y cochera. USD 85.000.',
      latitude: -32.4073,
      longitude: -63.2408,
    },
    {
      title: 'Departamento 2 ambientes Centro',
      slug: 'depto-2-amb-centro',
      description: 'Moderno departamento de 2 ambientes en pleno centro de Villa María. Ubicación inmejorable a pasos de la peatonal. Living-comedor con balcón a la calle, dormitorio con placard, baño completo y cocina separada. Edificio con ascensor. Ideal para inversión o primera vivienda.',
      price: 55000,
      currency: 'USD',
      address: 'Buenos Aires 456',
      neighborhood: 'Centro',
      propertyType: 'departamento',
      rooms: 2,
      bedrooms: 1,
      bathrooms: 1,
      garages: 0,
      totalArea: 52,
      coveredArea: 48,
      features: ['Balcón', 'Ascensor', 'Gas natural', 'Luminoso'],
      images: [
        'https://res.cloudinary.com/demo/image/upload/v1/real-estate/apt1.jpg',
      ],
      coverImage: 'https://res.cloudinary.com/demo/image/upload/v1/real-estate/apt1.jpg',
      status: 'available',
      featured: true,
      published: true,
      metaTitle: 'Departamento 2 Ambientes Centro | J-Lozita Villa María',
      metaDescription: 'Departamento en venta en el centro de Villa María. 2 ambientes, balcón, ascensor. USD 55.000.',
      latitude: -32.4078,
      longitude: -63.2480,
    },
    {
      title: 'Terreno 600m² en Barrio Palermo',
      slug: 'terreno-600m2-palermo',
      description: 'Excelente terreno de 600m² en Barrio Palermo, una de las zonas de mayor crecimiento de Villa María. Ideal para construir tu casa soñada. Todos los servicios: agua, luz, gas natural y cloacas. Calle asfaltada. Medidas: 15m de frente x 40m de fondo.',
      price: 35000,
      currency: 'USD',
      address: 'Calle Los Paraísos lote 12',
      neighborhood: 'Barrio Palermo',
      propertyType: 'terreno',
      rooms: null,
      bedrooms: null,
      bathrooms: null,
      garages: null,
      totalArea: 600,
      coveredArea: null,
      features: ['Todos los servicios', 'Calle asfaltada', 'Escritura inmediata'],
      images: [
        'https://res.cloudinary.com/demo/image/upload/v1/real-estate/land1.jpg',
      ],
      coverImage: 'https://res.cloudinary.com/demo/image/upload/v1/real-estate/land1.jpg',
      status: 'available',
      featured: false,
      published: true,
      metaTitle: 'Terreno 600m² Barrio Palermo | J-Lozita Villa María',
      metaDescription: 'Terreno en venta en Barrio Palermo, Villa María. 600m² con todos los servicios. USD 35.000.',
      latitude: -32.4150,
      longitude: -63.2350,
    },
  ]

  for (const property of properties) {
    await prisma.property.upsert({
      where: { slug: property.slug },
      update: {},
      create: property,
    })
  }

  console.log('✅ Seed completed: admin user + sample properties')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
