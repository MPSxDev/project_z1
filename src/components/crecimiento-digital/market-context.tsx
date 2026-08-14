'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { getCrecimientoDigitalWhatsAppUrl } from '@/lib/crecimiento-digital';
import { getCrecimientoDigitalClWhatsAppUrl } from '@/lib/crecimiento-digital-cl';

export type CrecimientoDigitalMarket = 'cr' | 'cl';

interface MarketContextValue {
  market: CrecimientoDigitalMarket;
  namespace: 'crecimientoDigital' | 'crecimientoDigitalCl';
  getWhatsAppUrl: (locale: string) => string;
}

const CrecimientoDigitalMarketContext = createContext<MarketContextValue>({
  market: 'cr',
  namespace: 'crecimientoDigital',
  getWhatsAppUrl: getCrecimientoDigitalWhatsAppUrl,
});

export function CrecimientoDigitalMarketProvider({
  market,
  children,
}: {
  market: CrecimientoDigitalMarket;
  children: ReactNode;
}) {
  const value: MarketContextValue =
    market === 'cl'
      ? {
          market,
          namespace: 'crecimientoDigitalCl',
          getWhatsAppUrl: getCrecimientoDigitalClWhatsAppUrl,
        }
      : {
          market,
          namespace: 'crecimientoDigital',
          getWhatsAppUrl: getCrecimientoDigitalWhatsAppUrl,
        };

  return (
    <CrecimientoDigitalMarketContext.Provider value={value}>
      {children}
    </CrecimientoDigitalMarketContext.Provider>
  );
}

export function useCrecimientoDigitalMarket() {
  return useContext(CrecimientoDigitalMarketContext);
}

export function useCrecimientoT(section: string) {
  const { namespace } = useCrecimientoDigitalMarket();
  return useTranslations(`${namespace}.${section}` as 'crecimientoDigital.hero');
}

export function useCrecimientoWhatsAppUrl() {
  const locale = useLocale();
  const { getWhatsAppUrl } = useCrecimientoDigitalMarket();
  return getWhatsAppUrl(locale);
}
