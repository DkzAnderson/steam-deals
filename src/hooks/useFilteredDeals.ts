import { useMemo } from "react";
import type { Deal, Filters } from "./types";

export function useFilteredDeals(deals: Deal[], filters: Filters): Deal[] {
  return useMemo(() => {
    const { search, minPrice, maxPrice, sortBy } = filters;

    let result = deals.filter((deal) => {
      const price = parseFloat(deal.salePrice);

      const matchesSearch =
        search.trim() === "" ||
        deal.title.toLowerCase().includes(search.trim().toLowerCase());

      const matchesMin = minPrice === null || price >= minPrice;
      const matchesMax = maxPrice === null || price <= maxPrice;

      return matchesSearch && matchesMin && matchesMax;
    });

    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return parseFloat(a.salePrice) - parseFloat(b.salePrice);
        case "price-desc":
          return parseFloat(b.salePrice) - parseFloat(a.salePrice);
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "metacritic-desc":
          return parseFloat(b.metacriticScore) - parseFloat(a.metacriticScore);
        case "release-desc":
          return (b.releaseDate ?? 0) - (a.releaseDate ?? 0);
        default:
          return 0;
      }
    });

    return result;
  }, [deals, filters]);
}