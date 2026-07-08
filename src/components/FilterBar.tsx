import type { Filters, SortOption } from "../hooks/types";

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "title-asc", label: "Título: A-Z" },
  { value: "title-desc", label: "Título: Z-A" },
  { value: "metacritic-desc", label: "Metacritic: mayor a menor" },
  { value: "release-desc", label: "Fecha de lanzamiento: más reciente" },
];

export function FilterBar({ filters, onChange }: FilterBarProps) {
  const update = (partial: Partial<Filters>) => {
    onChange({ ...filters, ...partial });
  };

  return (
    <div className="w-full bg-gray-900 border border-gray-800 shadow-sm rounded-xl px-4 p-4 mb-6 grid grid-cols-2 sm:grid-cols-3 grid-rows-3 sm:grid-rows-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
      {/* Búsqueda por título */}
      <div className="col-span-2 lg:col-span-5 flex flex-col flex-1">
        <label className="text-sm font-medium text-gray-400 mb-1">
          Buscar por título
        </label>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => update({ search: e.target.value })}
          placeholder="Ej: Elden Ring"
          className="bg-gray-800 border border-gray-700 text-gray-200 rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Precio mínimo */}
      <div className="flex flex-col w-full ">
        <label className="text-sm font-medium text-gray-400 mb-1">
          Precio mín.
        </label>
        <input
          type="number"
          min={0}
          step="0.01"
          value={filters.minPrice ?? ""}
          onChange={(e) =>
            update({
              minPrice: e.target.value === "" ? null : parseFloat(e.target.value),
            })
          }
          placeholder="0"
          className="bg-gray-800 border border-gray-700 text-gray-200 rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Precio máximo */}
      <div className="flex flex-col w-full ">
        <label className="text-sm font-medium text-gray-400 mb-1">
          Precio máx.
        </label>
        <input
          type="number"
          min={0}
          step="0.01"
          value={filters.maxPrice ?? ""}
          onChange={(e) =>
            update({
              maxPrice: e.target.value === "" ? null : parseFloat(e.target.value),
            })
          }
          placeholder="100"
          className="bg-gray-800 border border-gray-700 text-gray-200 rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Ordenar por */}
      <div className="flex flex-col w-full">
        <label className="text-sm font-medium text-gray-400 mb-1">
          Ordenar por
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => update({ sortBy: e.target.value as SortOption })}
          className="  bg-gray-800 border border-gray-700 text-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Botón limpiar filtros */}
      <button
        onClick={() =>
          onChange({
            ...defaultFiltersKeepSort(filters),
          })
        }
        className="transition-all duration-500 h-10 rounded-lg self-end bg-gray-800 hover:bg-cyan-600 hover:text-black font-bold text-sm text-gray-400  whitespace-nowrap lg:col-start-5 cursor-pointer"
      >
        Limpiar filtros
      </button>
    </div>
  );
}

function defaultFiltersKeepSort(filters: Filters): Filters {
  return {
    search: "",
    minPrice: null,
    maxPrice: null,
    sortBy: filters.sortBy,
  };
}