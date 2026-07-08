export function formatRelativeTime(unixTimestamp?: number): string {
  if (!unixTimestamp) return "Desconocido";

  const diffMs = Date.now() - unixTimestamp * 1000;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays >= 1) return diffDays === 1 ? "Hace 1 día" : `Hace ${diffDays} días`;
  if (diffHours >= 1) return diffHours === 1 ? "Hace 1 hora" : `Hace ${diffHours} horas`;
  if (diffMinutes >= 1) return diffMinutes === 1 ? "Hace 1 minuto" : `Hace ${diffMinutes} minutos`;
  return "Hace instantes";
}