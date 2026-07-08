import { DealCard } from './DealCard';
import { DealRow, ROW_GRID_COLS } from './DealRow';
import type { Deal } from '../hooks/types';
import type { ViewMode } from './ViewToggle';

interface DealListProps {
  deals: Deal[];
  viewMode: ViewMode;
}

export function DealList({ deals, viewMode }: DealListProps) {
  if (deals.length === 0) {
    return <p className="text-center text-gray-500">No hay ofertas disponibles</p>;
  }

  if (viewMode === 'grid') {
    return (
      <div className="overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pr-2">
        {deals.map((deal) => (
          <DealCard key={deal.dealID} {...deal} />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[900px] flex flex-col gap-2">
        {/* Encabezado de columnas */}
        <div
          className={`grid ${ROW_GRID_COLS} gap-3 px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-700`}
        >
          <span className='text-center'>Imagen</span>
          <span className='text-center'>Título</span>
          <span className='text-center'>Desc.</span>
          <span className='text-center'>Precio</span>
          <span className='text-center'>Rating</span>
          <span className='text-center'>Lanzamiento</span>
          <span className='text-center'>Comenzó</span>
          <span className='text-center'>Termina</span>
        </div>

        {deals.map((deal) => (
          <DealRow key={deal.dealID} deal={deal} />
        ))}
      </div>
    </div>
  );
}