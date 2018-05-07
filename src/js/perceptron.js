import Matrix from './matrix'

export const sigmoid = (value) => {
  return 1 / (1 + Math.exp(-value))
}

export const sigmoidDerivative = (value) => {
  return value * (1 - value)
}

let m = new Matrix(3, 3)
console.log(m.matrix)
