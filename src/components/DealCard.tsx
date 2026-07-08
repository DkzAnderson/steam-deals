import { useCurrency } from '../context/CurrencyContext';
import { ImageWithFallback } from './ImageWithFallback';
import { getDiscountBadgeClasses } from '../utils/discountBadge';

interface DealCardProps {
  title: string;
  salePrice: string;
  normalPrice: string;
  savings: string;
  metacriticScore: string;
  steamAppID: string;
}

export function DealCard({
  title,
  salePrice,
  normalPrice,
  savings,
  metacriticScore,
  steamAppID,
}: DealCardProps) {
  const { formatPrice } = useCurrency();

  const discountPercent = Math.round(parseFloat(savings));
  const isOnSale = discountPercent > 0;
  const imageUrl = `https://steamcdn-a.akamaihd.net/steam/apps/${steamAppID}/header.jpg`;

  return (
    <div className="bg-cyan-300/50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col min-h-62">
      <ImageWithFallback
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-md font-semibold text-white truncate" title={title}>
          {title}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <div>
            {isOnSale && (
              <span className="text-gray-400 line-through text-sm">
                {formatPrice(parseFloat(normalPrice))}
              </span>
            )}
            <span
              className={
                isOnSale
                  ? 'text-green-600 font-bold text-lg ml-2'
                  : 'text-white font-bold text-lg'
              }
            >
              {formatPrice(parseFloat(salePrice))}
            </span>
          </div>

          {isOnSale ? (
            <span
              className={`text-md font-bold p-1 rounded-lg ${getDiscountBadgeClasses(
                discountPercent
              )}`}
            >
              -{discountPercent}%
            </span>
          ) : (
            <span className="bg-gray-600 text-gray-300 text-md font-medium px-2 py-1 rounded-lg">
              Sin oferta
            </span>
          )}
        </div>
        {metacriticScore && metacriticScore !== '0' && (
          <div className="mt-2 text-xs text-yellow-300/70">
            Metacritic: {metacriticScore}
          </div>
        )}
      </div>
    </div>
  );
}