import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import {
  defaultLocale,
  locales,
  LOCALE_COOKIE,
  countryToLocale,
  type Locale,
} from './i18n/config';
import { routing } from './i18n/routing';

// Create the next-intl middleware with locale detection disabled
// We handle detection ourselves with custom priority logic
const intlMiddleware = createMiddleware(routing);

/**
 * Detects the preferred locale from the request
 * Priority: cookie -> country -> default (Spanish)
 * Accept-Language is intentionally not used - Spanish is the default for all visitors
 * except those from the US who get English
 */
function detectLocale(request: NextRequest): Locale | null {
  // 1. Check for existing locale cookie (user's explicit choice)
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  // 2. Check country from geolocation headers
  // Vercel Edge: x-vercel-ip-country, Cloudflare: cf-ipcountry
  const country =
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry');

  if (country && country in countryToLocale) {
    return countryToLocale[country];
  }

  // 3. Default to Spanish for all other visitors
  return null;
}

/**
 * Extracts the current locale from the URL pathname
 */
function getLocaleFromPathname(pathname: string): Locale | null {
  for (const locale of locales) {
    if (
      pathname.startsWith(`/${locale}/`) ||
      pathname === `/${locale}`
    ) {
      return locale;
    }
  }
  return null;
}

/**
 * Checks if this is a first visit (no locale cookie)
 */
function isFirstVisit(request: NextRequest): boolean {
  return !request.cookies.has(LOCALE_COOKIE);
}

function rewriteLocalizedPrivateAiRequest(
  request: NextRequest
): NextRequest | null {
  const pathname = request.nextUrl.pathname;
  if (pathname !== '/en/private-ai') {
    return null;
  }

  const url = request.nextUrl.clone();
  url.pathname = '/en/ia-privada';
  return new NextRequest(url, request);
}

export default function middleware(request: NextRequest) {
  const localizedPrivateAiRequest = rewriteLocalizedPrivateAiRequest(request);
  const activeRequest = localizedPrivateAiRequest ?? request;
  const pathname = activeRequest.nextUrl.pathname;

  // CR routes should always be in Spanish - redirect /en/cr/* to /cr/*
  if (pathname.startsWith('/en/cr')) {
    const newPathname = pathname.replace('/en/cr', '/cr');
    return NextResponse.redirect(new URL(newPathname, request.url));
  }

  // For /cr routes without locale prefix, rewrite internally to /es/cr
  if (pathname.startsWith('/cr')) {
    const newUrl = new URL(request.url);
    newUrl.pathname = `/es${pathname}`;
    return NextResponse.rewrite(newUrl);
  }

  // Handle locale detection for first-time visitors
  if (isFirstVisit(activeRequest)) {
    const detectedLocale = detectLocale(activeRequest);
    const urlLocale = getLocaleFromPathname(pathname);

    // Determine if we need to redirect
    // Default locale (es) has no prefix, others need prefix
    const effectiveUrlLocale = urlLocale ?? defaultLocale;

    if (detectedLocale && detectedLocale !== effectiveUrlLocale) {
      // Build redirect URL
      let newPathname = pathname;

      // Remove current locale prefix if present
      if (urlLocale) {
        newPathname = pathname.replace(`/${urlLocale}`, '') || '/';
      }

      // Add new locale prefix if not default
      if (detectedLocale !== defaultLocale) {
        newPathname = `/${detectedLocale}${newPathname === '/' ? '' : newPathname}`;
      }

      const redirectUrl = new URL(newPathname, activeRequest.url);
      const response = NextResponse.redirect(redirectUrl);

      // Set the locale cookie to persist detected preference
      response.cookies.set(LOCALE_COOKIE, detectedLocale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: 'lax',
      });

      return response;
    }

    // No redirect needed, but set cookie with current locale
    const response = localizedPrivateAiRequest
      ? NextResponse.rewrite(activeRequest.nextUrl)
      : intlMiddleware(activeRequest);
    response.cookies.set(LOCALE_COOKIE, effectiveUrlLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
    return response;
  }

  // Returning visitor - next-intl handles routing, cookie already exists
  if (localizedPrivateAiRequest) {
    return NextResponse.rewrite(activeRequest.nextUrl);
  }

  return intlMiddleware(activeRequest);
}

export const config = {
  // Match all pathnames except for:
  // - API routes
  // - Static files (_next/static, _next/image, favicon.ico, etc.)
  // - Public assets (images, brand assets, etc.)
  matcher: [
    '/',
    '/(es|en)/:path*',
    // Match all paths except static files and API
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
