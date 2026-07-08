export function getDiscountBadgeClasses(percent: number): string {
  if (percent >= 70) {
    return "bg-gradient-to-br from-white to-green-600 text-cyan-900";
  }
  if (percent >= 50) {
    return "bg-gradient-to-br from-white to-cyan-500 text-cyan-900";
  }
  if (percent >= 35) {
    return "bg-gradient-to-br from-white to-orange-400 text-orange-900";
  }
  return "bg-gradient-to-br from-white to-red-500 text-red-900";
}