export function isAvailabilityExpired(date: Date): boolean {
  const currentDate = new Date()
  return currentDate > date
}
