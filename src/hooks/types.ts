export interface Deal {
  dealID: string;
  title: string;
  salePrice: string;
  normalPrice: string;
  savings: string;
  metacriticScore: string;
  steamAppID: string;
  releaseDate: number;
  thumb: string;
  steamRatingPercent?: string;
  steamRatingText?: string;
  lastChange?: number;
}

export interface ApiResponse {
  deals: Deal[];
}

export type SortOption =
  | "price-asc"
  | "price-desc"
  | "title-asc"
  | "title-desc"
  | "metacritic-desc"
  | "release-desc";

export interface Filters {
  search: string;
  minPrice: number | null;
  maxPrice: number | null;
  sortBy: SortOption;
}

export const defaultFilters: Filters = {
  search: "",
  minPrice: null,
  maxPrice: null,
  sortBy: "price-asc",
};

export type CurrencyCode = "PEN" | "USD" | "EUR" | "GBP" | "MXN" | "ARS" | "BRL";

export interface CurrencyOption {
  code: CurrencyCode;
  label: string;
  locale: string;
}

export const currencyOptions: CurrencyOption[] = [
  { code: "PEN", label: "🇵🇪 Soles (S/)", locale: "es-PE" },
  { code: "USD", label: "🇺🇸 Dólares ($)", locale: "en-US" },
  { code: "EUR", label: "🇪🇺 Euros (€)", locale: "de-DE" },
  { code: "GBP", label: "🇬🇧 Libras (£)", locale: "en-GB" },
  { code: "MXN", label: "🇲🇽 Pesos mexicanos ($)", locale: "es-MX" },
  { code: "ARS", label: "🇦🇷 Pesos argentinos ($)", locale: "es-AR" },
  { code: "BRL", label: "🇧🇷 Reales (R$)", locale: "pt-BR" },
];