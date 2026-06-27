const pageImagesGlob = import.meta.glob<{ default: string }>(
  '/src/assets/img_catalogo/*.jpg',
  { eager: true },
)

const pageUrls: string[] = Object.keys(pageImagesGlob)
  .sort()
  .map((key) => pageImagesGlob[key].default)

export type MagazinePage = {
  id: number
  label: string
  kind: 'cover' | 'content' | 'service' | 'back'
  src?: string
  serviceNumber?: string
  title?: string
  price?: string
  prompt: string
}

export const magazineMeta = {
  title: 'AKADEM',
  subtitle: 'Consultoría Organizacional',
  issue: 'Catálogo de Servicios',
  date: '2026',
}

export const pages: MagazinePage[] = [
  {
    id: 1,
    label: 'Portada',
    kind: 'cover',
    src: pageUrls[0],
    prompt: 'Portada del Catálogo de Servicios AKADEM',
  },
  {
    id: 2,
    label: 'Quiénes Somos',
    kind: 'content',
    src: pageUrls[1],
    prompt: 'Presentación del equipo y origen del nombre AKADEM',
  },
  {
    id: 3,
    label: 'Misión y Valores',
    kind: 'content',
    src: pageUrls[2],
    prompt: 'Misión, visión y valores de AKADEM',
  },
  {
    id: 4,
    label: 'Problemas',
    kind: 'content',
    src: pageUrls[3],
    prompt: '¿Qué problemas resolvemos?',
  },
  {
    id: 5,
    label: 'Atendemos',
    kind: 'content',
    src: pageUrls[4],
    prompt: 'Problemas institucionales que atendemos',
  },
  {
    id: 6,
    label: 'Servicio 01',
    kind: 'service',
    src: pageUrls[5],
    serviceNumber: '01',
    title: 'Diagnóstico Integral Institucional',
    price: '$10,000 MXN',
    prompt: 'Diagnóstico Integral Institucional — análisis de comunicación y atención',
  },
  {
    id: 7,
    label: 'Servicio 02',
    kind: 'service',
    src: pageUrls[6],
    serviceNumber: '02',
    title: 'Capacitación en atención y comunicación',
    price: '$8,300 MXN',
    prompt: 'Capacitación en atención, trato y comunicación escolar',
  },
  {
    id: 8,
    label: 'Servicio 03',
    kind: 'service',
    src: pageUrls[7],
    serviceNumber: '03',
    title: 'Protocolos de atención escolar',
    price: '$7,500 MXN',
    prompt: 'Diseño de protocolos de atención y seguimiento escolar',
  },
  {
    id: 9,
    label: 'Servicio 04',
    kind: 'service',
    src: pageUrls[8],
    serviceNumber: '04',
    title: 'Fidelización de familias',
    price: '$8,500 MXN',
    prompt: 'Estrategia de experiencia y fidelización de familias',
  },
  {
    id: 10,
    label: 'Servicio 05',
    kind: 'service',
    src: pageUrls[9],
    serviceNumber: '05',
    title: 'Imagen y posicionamiento',
    price: '$10,000 MXN',
    prompt: 'Estrategia de imagen y posicionamiento institucional',
  },
  {
    id: 11,
    label: 'Servicio 06',
    kind: 'service',
    src: pageUrls[10],
    serviceNumber: '06',
    title: 'Clima organizacional',
    price: '$8,000 MXN',
    prompt: 'Evaluación del clima organizacional escolar',
  },
  {
    id: 12,
    label: 'Beneficios',
    kind: 'content',
    src: pageUrls[11],
    prompt: 'Beneficios generales de contratar AKADEM Consultoría',
  },
  {
    id: 13,
    label: 'Casos de Éxito',
    kind: 'content',
    src: pageUrls[12],
    prompt: 'Casos de éxito y resultados esperados',
  },
  {
    id: 14,
    label: 'Contacto',
    kind: 'back',
    src: pageUrls[13],
    prompt: 'Datos de contacto — Playa del Carmen, Quintana Roo, México',
  },
]
