import { createContext, useContext, useState, useMemo } from "react";
import type { ReactNode } from "react";
import type { CurrencyCode } from "../hooks/types";
import { useExchangeRate } from "../hooks/useExchangeRate";
import { currencyOptions } from "../hooks/types";

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  convert: (usdPrice: number) => number;
  formatPrice: (usdPrice: number) => string;
  rateLoading: boolean;
  rateError: string | null;
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

// Construye el mapa de locales dinámicamente a partir de currencyOptions
const LOCALE_BY_CURRENCY: Record<CurrencyCode, string> = Object.fromEntries(
  currencyOptions.map((opt) => [opt.code, opt.locale])
) as Record<CurrencyCode, string>;

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>("PEN");
  const { rates, loading, error } = useExchangeRate();

  const convert = useMemo(() => {
    return (usdPrice: number) => usdPrice * rates[currency];
  }, [rates, currency]);

  const formatPrice = useMemo(() => {
    return (usdPrice: number) => {
      const converted = convert(usdPrice);
      return new Intl.NumberFormat(LOCALE_BY_CURRENCY[currency], {
        style: "currency",
        currency,
      }).format(converted);
    };
  }, [convert, currency]);

  const value: CurrencyContextValue = {
    currency,
    setCurrency,
    convert,
    formatPrice,
    rateLoading: loading,
    rateError: error,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency debe usarse dentro de un <CurrencyProvider>");
  }
  return ctx;
}