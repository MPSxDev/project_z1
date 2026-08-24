import type { Locale } from '@/i18n/config';

export const PRIVATE_AI_PHONE = '50670724236';

/** Internal pathname key for next-intl Link/router usage. */
export const PRIVATE_AI_INTERNAL_PATH = '/ia-privada';

export const PRIVATE_AI_LOCALIZED_PATHS: Record<Locale, string> = {
  es: '/ia-privada',
  en: '/private-ai',
};

export function getPrivateAiPath(locale: string): string {
  return locale === 'en'
    ? PRIVATE_AI_LOCALIZED_PATHS.en
    : PRIVATE_AI_LOCALIZED_PATHS.es;
}

/** @deprecated Prefer getPrivateAiPath or PRIVATE_AI_INTERNAL_PATH. */
export const PRIVATE_AI_PATH = PRIVATE_AI_INTERNAL_PATH;

export type PrivateAiIntent =
  | 'assessment'
  | 'pilot'
  | 'enterprise'
  | 'managed';

const MESSAGES_ES: Record<PrivateAiIntent, string> = {
  assessment:
    'Hola, vengo de la landing de Private AI. Quiero solicitar una evaluación para mi organización.',
  pilot:
    'Hola, vengo de la landing de Private AI. Quiero conversar sobre un piloto de Private AI.',
  enterprise:
    'Hola, vengo de la landing de Private AI. Quiero hablar con un especialista sobre infraestructura de IA en producción.',
  managed:
    'Hola, vengo de la landing de Private AI. Quiero conocer Managed Private AI.',
};

const MESSAGES_EN: Record<PrivateAiIntent, string> = {
  assessment:
    'Hello, I came from the Private AI landing page. I would like to request an assessment for my organization.',
  pilot:
    'Hello, I came from the Private AI landing page. I would like to discuss a Private AI pilot.',
  enterprise:
    'Hello, I came from the Private AI landing page. I would like to speak with a specialist about production AI infrastructure.',
  managed:
    'Hello, I came from the Private AI landing page. I would like to learn about Managed Private AI.',
};

export function getPrivateAiWhatsAppUrl(
  locale: string,
  intent: PrivateAiIntent = 'assessment'
): string {
  const message = locale === 'es' ? MESSAGES_ES[intent] : MESSAGES_EN[intent];
  return `https://wa.me/${PRIVATE_AI_PHONE}?text=${encodeURIComponent(message)}`;
}

export function isPrivateAiPath(pathname: string): boolean {
  return (
    pathname.includes(PRIVATE_AI_LOCALIZED_PATHS.es) ||
    pathname.includes(PRIVATE_AI_LOCALIZED_PATHS.en)
  );
}

export const PRIVATE_AI_SECTIONS = {
  howItWorks: 'como-funciona',
  capabilities: 'infraestructura',
  useCases: 'casos-de-uso',
  packages: 'soluciones',
  faq: 'faq',
  assessment: 'evaluacion',
} as const;

export const PRIVATE_AI_ASSET_SIZE = {
  width: 717,
  height: 296,
} as const;

export const PRIVATE_AI_ASSETS = {
  problem: '/assets/private-ai/p1.webp',
  core: '/assets/private-ai/11.webp',
  architecture: '/assets/private-ai/2.webp',
  dataControl: '/assets/private-ai/3.webp',
  knowledge: '/assets/private-ai/4.webp',
  gateway: '/assets/private-ai/5.webp',
  infrastructure: '/assets/private-ai/6.webp',
} as const;
