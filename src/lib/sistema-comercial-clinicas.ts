export const CLINICAS_PHONE = '50670724236';

export const CLINICAS_WHATSAPP_MESSAGE_ES =
  'Hola, vengo de la landing del Sistema Comercial para clínicas. Quiero el diagnóstico de brecha para mi clínica.';

export const CLINICAS_WHATSAPP_MESSAGE_EN =
  'Hello, I came from the Clinic Commercial System landing page. I would like the gap diagnosis for my clinic.';

export function getClinicasWhatsAppUrl(locale: string): string {
  const message =
    locale === 'es'
      ? CLINICAS_WHATSAPP_MESSAGE_ES
      : CLINICAS_WHATSAPP_MESSAGE_EN;
  return `https://wa.me/${CLINICAS_PHONE}?text=${encodeURIComponent(message)}`;
}
