import { useCurrency } from '../context/CurrencyContext';
import { ImageWithFallback } from './ImageWithFallback';
import { getDiscountBadgeClasses } from '../utils/discountBadge';
import { formatDate } from '../utils/formatDate';
import { formatRelativeTime } from '../utils/formatRelativeTime';
import type { Deal } from '../hooks/types';

const ROW_GRID_COLS =
  'grid-cols-[64px_minmax(160px,2fr)_80px_110px_130px_110px_120px_140px] text-center';

export { ROW_GRID_COLS };

interface DealRowProps {
  deal: Deal;
}

export function DealRow({ deal }: DealRowProps) {
  const { formatPrice } = useCurrency();

  const discountPercent = Math.round(parseFloat(deal.savings));
  const isOnSale = discountPercent > 0;
  const imageUrl = `https://steamcdn-a.akamaihd.net/steam/apps/${deal.steamAppID}/header.jpg`;

  const hasRating =
    deal.steamRatingPercent && deal.steamRatingPercent !== '0';

  return (
    <div
      className={`grid ${ROW_GRID_COLS} gap-3 items-center bg-cyan-300/10 hover:bg-cyan-300/20 transition-colors rounded-lg px-3 py-2`}
    >
      <ImageWithFallback
        src={imageUrl}
        alt={deal.title}
        className="w-16 h-9 object-cover rounded shrink-0"
      />

      <span className="text-start text-sm font-medium text-white truncate" title={deal.title}>
        {deal.title}
      </span>

      {isOnSale ? (
        <span
          className={`size-full text-l font-bold p-1 rounded-xl text-center ${getDiscountBadgeClasses(
            discountPercent
          )}`}
        >
          -{discountPercent}%
        </span>
      ) : (
        <span className="size-full bg-gray-600 text-gray-300 text-l font-medium p-1 rounded-xl text-center">
          Sin oferta
        </span>
      )}

      <div className="flex flex-col text-xs leading-tight">
        {isOnSale && (
          <span className="size-full text-center text-gray-400 line-through">
            {formatPrice(parseFloat(deal.normalPrice))}
          </span>
        )}
        <span className={isOnSale ? 'text-center text-green-400 font-bold' : 'text-center text-white font-bold'}>
          {formatPrice(parseFloat(deal.salePrice))}
        </span>
      </div>

      <span className="text-xs text-yellow-300/80">
        {hasRating ? `${deal.steamRatingPercent}% · ${deal.steamRatingText}` : 'Sin rating'}
      </span>

      <span className="text-xs text-gray-400">
        {formatDate(deal.releaseDate)}
      </span>

      <span className="text-xs text-gray-400">
        {formatRelativeTime(deal.lastChange)}
      </span>

      <span className="text-xs text-gray-500 italic">
        No especificado por Steam
      </span>
    </div>
  );
}