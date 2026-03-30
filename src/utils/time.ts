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

// Get today's date string in YYYY-MM-DD using local timezone (not UTC)
export const localToday = (): string => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

// Filter out past time slots when selected date is today
export const filterPastSlots = (slots: string[], selectedDate: string): string[] => {
  const d = new Date()
  const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
  if (selectedDate !== today) return slots
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  return slots.filter((slot) => {
    const [h, m] = slot.split(":").map(Number)
    return h * 60 + m > currentMinutes
  })
}
