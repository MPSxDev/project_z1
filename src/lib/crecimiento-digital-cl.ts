export const CRECIMIENTO_DIGITAL_CL_PHONE = '56983318624';

export const CRECIMIENTO_DIGITAL_CL_WHATSAPP_MESSAGE_ES =
  'Hola, vengo de la página de Crecimiento Digital Chile y quiero solicitar el diagnóstico gratuito para mi empresa.';

export const CRECIMIENTO_DIGITAL_CL_WHATSAPP_MESSAGE_EN =
  'Hello, I came from the Digital Growth Chile page and I would like to request a free assessment for my business.';

export function isCrecimientoDigitalClPath(pathname: string): boolean {
  return pathname.includes('/crecimiento-digital/cl');
}

export function getCrecimientoDigitalClWhatsAppUrl(locale: string): string {
  const message =
    locale === 'es'
      ? CRECIMIENTO_DIGITAL_CL_WHATSAPP_MESSAGE_ES
      : CRECIMIENTO_DIGITAL_CL_WHATSAPP_MESSAGE_EN;
  return `https://wa.me/${CRECIMIENTO_DIGITAL_CL_PHONE}?text=${encodeURIComponent(message)}`;
}
