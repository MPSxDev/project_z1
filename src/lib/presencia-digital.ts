export const PRESENCIA_DIGITAL_PHONE = '50683335408';

export const PRESENCIA_DIGITAL_WHATSAPP_MESSAGE_ES =
  'Hola, vengo de la página de Presencia Digital y quiero solicitar el diagnóstico gratuito para mi empresa.';

export const PRESENCIA_DIGITAL_WHATSAPP_MESSAGE_EN =
  'Hello, I came from the Digital Presence page and I would like to request a free assessment for my business.';

export function getPresenciaDigitalWhatsAppUrl(locale: string): string {
  const message =
    locale === 'es'
      ? PRESENCIA_DIGITAL_WHATSAPP_MESSAGE_ES
      : PRESENCIA_DIGITAL_WHATSAPP_MESSAGE_EN;
  return `https://wa.me/${PRESENCIA_DIGITAL_PHONE}?text=${encodeURIComponent(message)}`;
}

export interface CompanyLogo {
  name: string;
  logo: string;
  large?: boolean;
}

export const PRESENCIA_DIGITAL_LOGOS: CompanyLogo[] = [
  { name: '3M', logo: '/assets/logos/3m.png' },
  { name: 'GastroMedical CR', logo: '/assets/logos/drzuniga-logo.png', large: true },
  { name: 'PHYC', logo: '/assets/logos/phyclogo-removedbg.png' },
  { name: 'HS', logo: '/assets/logos/hslogo.png' },
  { name: 'Construrack', logo: '/assets/logos/construrack.png' },
  { name: 'Quant Energy', logo: '/assets/logos/quant_energy.png' },
];

/**
 * Image paths for presencia-digital landing.
 * Replace placeholder SVGs in /public/assets/presencia-digital/ with final assets.
 */
export const PRESENCIA_DIGITAL_IMAGES = {
  heroMockup: '/assets/presencia-digital/gastro-hero-2.webp',
  problemVisual: '/assets/presencia-digital/problem-visual.webp',
  testimonialAvatar: '/assets/presencia-digital/gastro-hero-2.webp',
  caseStudyGastroMedical: '/assets/presencia-digital/GASTRO.webp',
  caseStudyPhyc: '/assets/presencia-digital/placeholders/case-study-phyc.svg',
} as const;
