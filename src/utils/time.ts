// Generate 30-minute time slots from a "HH:MM-HH:MM" range string
export const generateTimeSlots = (timeSlot: string): string[] => {
  const [start, end] = timeSlot.split("-")
  const [startH, startM] = start.split(":").map(Number)
  const [endH, endM] = end.split(":").map(Number)

  const slots: string[] = []
  let h = startH
  let m = startM

  while (h * 60 + m < endH * 60 + endM) {
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`)
    m += 30
    if (m >= 60) {
      m -= 60
      h += 1
    }
  }

  return slots
}
