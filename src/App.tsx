import { useState, useMemo } from 'react';
import { useDeals } from './hooks/useDeals';
import { useDealSearch } from './hooks/useDealSearch';
import { useFilteredDeals } from './hooks/useFilteredDeals';
import { DealList } from './components/DealList';
import { FilterBar } from './components/FilterBar';
import { CurrencySelector } from './components/CurrencySelector';
import { ViewToggle } from './components/ViewToggle';
import type { ViewMode } from './components/ViewToggle';
import { CurrencyProvider } from './context/CurrencyContext';
import type { Filters } from './hooks/types';
import { defaultFilters } from './hooks/types';

const MIN_SEARCH_LENGTH = 2;

function AppContent() {
  const { deals, loading: dealsLoading, error: dealsError, refetch } = useDeals();
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const isSearching = filters.search.trim().length >= MIN_SEARCH_LENGTH;
  const { results: searchResults, loading: searchLoading, error: searchError } =
    useDealSearch(filters.search);

  const sourceDeals = isSearching ? searchResults : deals;
  const effectiveFilters: Filters = isSearching ? { ...filters, search: '' } : filters;

  const filteredDeals = useFilteredDeals(sourceDeals, effectiveFilters);

  const loading = isSearching ? searchLoading : dealsLoading;
  const error = isSearching ? searchError : dealsError;

  const emptyMessage = useMemo(() => {
    if (isSearching) return 'No se encontró ningún juego con ese título.';
    return 'No se encontraron ofertas con esos filtros.';
  }, [isSearching]);

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-wrap justify-between items-center gap-3 mb-8">
          <h1 className="text-3xl font-bold text-gray-200">
            🔥 Ofertas de Steam
          </h1>
          <div className="flex items-center gap-3">
            <ViewToggle viewMode={viewMode} onChange={setViewMode} />
            <CurrencySelector />
            <button
              onClick={refetch}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={dealsLoading}
            >
              {dealsLoading ? 'Cargando...' : 'Recargar'}
            </button>
          </div>
        </header>

        <FilterBar filters={filters} onChange={setFilters} />

        {isSearching && (
          <p className="text-sm text-gray-400 mb-4">
            {searchLoading
              ? 'Buscando juego...'
              : `Resultados de búsqueda para "${filters.search}" (con o sin descuento)`}
          </p>
        )}

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>Error: {error}</p>
            {!isSearching && (
              <button onClick={refetch} className="text-blue-600 underline mt-2">
                Intentar de nuevo
              </button>
            )}
          </div>
        )}

        {!loading && !error && filteredDeals.length === 0 && (
          <p className="text-gray-400 text-center mt-8">{emptyMessage}</p>
        )}

        {!loading && !error && filteredDeals.length > 0 && (
          <DealList deals={filteredDeals} viewMode={viewMode} />
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <CurrencyProvider>
      <AppContent />
    </CurrencyProvider>
  );
}

export default App;