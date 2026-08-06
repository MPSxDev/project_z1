export const CRECIMIENTO_DIGITAL_PHONE = '50683335408';

export const CRECIMIENTO_DIGITAL_WHATSAPP_MESSAGE_ES =
  'Hola, vengo de la página de Crecimiento Digital y quiero solicitar el diagnóstico gratuito para mi empresa.';

export const CRECIMIENTO_DIGITAL_WHATSAPP_MESSAGE_EN =
  'Hello, I came from the Digital Growth page and I would like to request a free assessment for my business.';

export function getCrecimientoDigitalWhatsAppUrl(locale: string): string {
  const message =
    locale === 'es'
      ? CRECIMIENTO_DIGITAL_WHATSAPP_MESSAGE_ES
      : CRECIMIENTO_DIGITAL_WHATSAPP_MESSAGE_EN;
  return `https://wa.me/${CRECIMIENTO_DIGITAL_PHONE}?text=${encodeURIComponent(message)}`;
}

export interface CompanyLogo {
  name: string;
  logo: string;
  large?: boolean;
}

export const CRECIMIENTO_DIGITAL_LOGOS: CompanyLogo[] = [
  { name: '3M', logo: '/assets/logos/3m.png' },
  { name: 'GastroMedical CR', logo: '/assets/logos/drzuniga-logo.png', large: true },
  { name: 'PHYC', logo: '/assets/logos/phyclogo-removedbg.png' },
  { name: 'HS', logo: '/assets/logos/hslogo.png' },
  { name: 'Construrack', logo: '/assets/logos/construrack.png' },
  { name: 'Quant Energy', logo: '/assets/logos/quant_energy.png' },
];

/**
 * Image paths for crecimiento-digital landing.
 * Replace placeholder SVGs in /public/assets/crecimiento-digital/ with final assets.
 */
export const CRECIMIENTO_DIGITAL_IMAGES = {
  heroMockup: '/assets/crecimiento-digital/gastro-hero-2.webp',
  problemVisual: '/assets/crecimiento-digital/problem-visual.webp',
  testimonialAvatar: '/assets/crecimiento-digital/gastro-hero-2.webp',
  caseStudyGastroMedical: '/assets/crecimiento-digital/GASTRO.webp',
  caseStudyPhyc: '/assets/crecimiento-digital/placeholders/case-study-phyc.svg',
} as const;
