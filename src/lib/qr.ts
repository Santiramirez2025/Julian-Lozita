import QRCode from 'qrcode'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://julianlozita.com'

export function getPropertyUrl(slug: string): string {
  return `${SITE_URL}/propiedades/${slug}`
}

export async function generateQRDataUrl(slug: string): Promise<string> {
  const url = getPropertyUrl(slug)
  return QRCode.toDataURL(url, {
    width: 400,
    margin: 2,
    color: {
      dark: '#1E3A5F',
      light: '#FFFFFF',
    },
    errorCorrectionLevel: 'H',
  })
}

export async function generateQRBuffer(slug: string): Promise<Buffer> {
  const url = getPropertyUrl(slug)
  return QRCode.toBuffer(url, {
    width: 800,
    margin: 2,
    color: {
      dark: '#1E3A5F',
      light: '#FFFFFF',
    },
    errorCorrectionLevel: 'H',
  })
}

export async function generateQRSvg(slug: string): Promise<string> {
  const url = getPropertyUrl(slug)
  return QRCode.toString(url, {
    type: 'svg',
    width: 400,
    margin: 2,
    color: {
      dark: '#1E3A5F',
      light: '#FFFFFF',
    },
    errorCorrectionLevel: 'H',
  })
}
