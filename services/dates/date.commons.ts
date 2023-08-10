interface IIsTimeSlotExpiredParams {
  start: Date
  end: Date
}

export function isTimeSlotExpired(timeslot: IIsTimeSlotExpiredParams): boolean {
  const { start } = timeslot
  const currentDate = new Date()
  return currentDate > start
}
