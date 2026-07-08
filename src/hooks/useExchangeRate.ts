import { useState, useEffect } from "react";
import type { CurrencyCode } from "./types";

// Tasas de respaldo por si la API falla (actualízalas manualmente de vez en cuando)
const FALLBACK_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  PEN: 3.75,
  EUR: 0.92,
  GBP: 0.79,
  MXN: 18.5,
  ARS: 1275,
  BRL: 5.6,
};

interface ExchangeRateState {
  rates: Record<CurrencyCode, number>;
  loading: boolean;
  error: string | null;
}

export function useExchangeRate() {
  const [state, setState] = useState<ExchangeRateState>({
    rates: FALLBACK_RATES,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

async function fetchRate() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    if (!res.ok) throw new Error("No se pudo obtener la tasa de cambio");
    const data = await res.json();

    if (!cancelled && data?.rates) {
      const codes: CurrencyCode[] = ["PEN", "EUR", "GBP", "MXN", "ARS", "BRL"];
      const rates: Record<CurrencyCode, number> = { ...FALLBACK_RATES };

      codes.forEach((code) => {
        if (typeof data.rates[code] === "number") {
          rates[code] = data.rates[code];
        }
      });

      setState({ rates, loading: false, error: null });
    }
  } catch (err) {
    if (!cancelled) {
      setState({
        rates: FALLBACK_RATES,
        loading: false,
        error: "Usando tasas de cambio aproximadas (sin conexión a la API)",
      });
    }
  }
}

    fetchRate();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}