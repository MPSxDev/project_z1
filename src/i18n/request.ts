import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

// This is the configuration for next-intl on the server side
// It loads the appropriate messages based on the requested locale
export default getRequestConfig(async ({ requestLocale }) => {
  // Get the requested locale
  const requested = await requestLocale;

  // Validate that the locale exists in our supported locales
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
