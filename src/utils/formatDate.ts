export function formatDate(unixTimestamp: number): string {
  if (!unixTimestamp) return "Fecha desconocida";
  return new Intl.DateTimeFormat("es-PE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(unixTimestamp * 1000));
}