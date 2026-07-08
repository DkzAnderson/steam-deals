import { currencyOptions } from "../hooks/types";
import { useCurrency } from "../context/CurrencyContext";

export function CurrencySelector() {
  const { currency, setCurrency, rateLoading, rateError } = useCurrency();

  return (
    <div className="flex flex-col items-end">
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as typeof currency)}
        className="bg-gray-800 border border-gray-700 text-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        {currencyOptions.map((opt) => (
          <option key={opt.code} value={opt.code}>
            {opt.label}
          </option>
        ))}
      </select>
      {rateLoading && (
        <span className="text-xs text-gray-500 mt-1">Cargando tasa de cambio...</span>
      )}
      {rateError && (
        <span className="text-xs text-yellow-500 mt-1">{rateError}</span>
      )}
    </div>
  );
}