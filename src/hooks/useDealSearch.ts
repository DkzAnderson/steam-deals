import { useState, useEffect, useRef } from "react";
import type { Deal } from "./types";

interface UseDealSearchResult {
  results: Deal[];
  loading: boolean;
  error: string | null;
}

const DEBOUNCE_MS = 400;
const MIN_QUERY_LENGTH = 2;

export function useDealSearch(query: string): UseDealSearchResult {
  const [results, setResults] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const trimmed = query.trim();

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (trimmed.length < MIN_QUERY_LENGTH) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    debounceRef.current = setTimeout(async () => {
      try {
        // Sin upperPrice ni onSale: trae el juego exista o no descuento activo
        const url = `https://www.cheapshark.com/api/1.0/deals?storeID=1&title=${encodeURIComponent(
          trimmed
        )}&pageSize=60`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data: Deal[] = await response.json();
        const validDeals = data.filter((deal) => deal.steamAppID && deal.steamAppID !== "0");
        setResults(validDeals);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido al buscar");
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  return { results, loading, error };
}