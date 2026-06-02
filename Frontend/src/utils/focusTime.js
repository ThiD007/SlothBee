export const defaultFocusSummary = {
  todaySeconds: 0,
  weekSeconds: 0,
  dailySeconds: [0, 0, 0, 0, 0, 0, 0],
}

export function formatFocusDuration(totalSeconds, { longMinutes = false } = {}) {
  const safeSeconds = Math.max(0, Number(totalSeconds) || 0)
  const hours = Math.floor(safeSeconds / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)
  const minuteLabel = longMinutes ? "min" : "m"

  if (hours <= 0) return `${minutes}${minuteLabel}`
  return `${hours}h ${String(minutes).padStart(2, "0")}${minuteLabel}`
}
