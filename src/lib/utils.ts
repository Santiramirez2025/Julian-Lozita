export function formatPrice(price: number, currency: string = 'USD'): string {
  if (currency === 'USD') {
    return `USD ${price.toLocaleString('es-AR')}`
  }
  return `$ ${price.toLocaleString('es-AR')}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function propertyTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    casa: 'Casa',
    departamento: 'Departamento',
    terreno: 'Terreno',
    local: 'Local comercial',
    galpon: 'Galpón',
  }
  return labels[type] || type
}

export function statusLabel(status: string): string {
  const labels: Record<string, string> = {
    available: 'Disponible',
    reserved: 'Reservada',
    sold: 'Vendida',
  }
  return labels[status] || status
}

export function statusColor(status: string): string {
  const colors: Record<string, string> = {
    available: 'bg-emerald-500',
    reserved: 'bg-amber-500',
    sold: 'bg-red-500',
  }
  return colors[status] || 'bg-gray-500'
}

export function getWhatsAppLink(message: string): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5493534222575'
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

export function getPropertyWhatsAppMessage(title: string, neighborhood: string): string {
  return `Hola Julián! Me interesa la propiedad "${title}" en ${neighborhood}. ¿Podemos hablar?`
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter((c): c is string => typeof c === 'string' && c.length > 0).join(' ')
}

export function timeAgo(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days === 0) return 'Hoy'
  if (days === 1) return 'Ayer'
  if (days < 7) return `Hace ${days} días`
  if (days < 30) return `Hace ${Math.floor(days / 7)} semanas`
  if (days < 365) return `Hace ${Math.floor(days / 30)} meses`
  return `Hace ${Math.floor(days / 365)} años`
}
