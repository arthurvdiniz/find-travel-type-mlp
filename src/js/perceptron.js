export const sigmoid = (value) => {
  return 1 / (1 + exp(-value))
}

export const sigmoid_derivative = (value) => {
  return value * (1 - value)
}