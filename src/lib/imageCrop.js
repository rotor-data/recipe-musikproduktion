export const normalizeCropPosition = value => {
  const normalized = String(value || "center").trim().toLowerCase()
  if (normalized === "top" || normalized === "bottom") {
    return normalized
  }

  return "center"
}

export const cropPositionToObjectPosition = value => {
  const normalized = normalizeCropPosition(value)

  if (normalized === "top") return "50% 0%"
  if (normalized === "bottom") return "50% 100%"
  return "50% 50%"
}
