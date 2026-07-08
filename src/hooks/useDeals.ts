import { useState, useEffect, useCallback } from 'react';

// Definimos los tipos de la respuesta de la API
interface Deal {
  dealID: string;
  title: string;
  salePrice: string;
  normalPrice: string;
  savings: string; // porcentaje de descuento, viene como string '40.1234'
  metacriticScore: string;
  steamAppID: string;
  releaseDate: number; // timestamp
  thumb: string;
}

/*

Revisar
interface ApiResponse {
  deals: Deal[];
}

*/
export function useDeals() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDeals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url =
        'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=50&pageSize=60';
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      // Algunos juegos pueden venir sin steamAppID, los filtramos para no dar error en imágenes
      const validDeals = data.filter((deal: Deal) => deal.steamAppID && deal.steamAppID !== '0');
      setDeals(validDeals);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  return { deals, loading, error, refetch: fetchDeals };
}