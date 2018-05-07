export default class Matrix {
  constructor (rows, cols) {
    this.rows = rows
    this.cols = cols
    this.data = []

    for (let i = 0; i < this.rows; i++) {
      this.data[i] = []
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = 0
      }
    }
  }
  randomize = () => {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = Math.random()
      }
    }
  }
  add = (n) => {
    if (n instanceof Matrix) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] += n.data[i][j]
        }
      }
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] += n
        }
      }
    }
  }
  static multiply(matrixWeights, matrixVariables) {
  // matrix product
    if (matrixWeights.cols !== matrixVariables.rows) {
      console.log('Número de colunas precisa ser igual número de linhas.')
      return undefined
    }
    let result = new Matrix(matrixWeights.rows, matrixVariables.cols)
    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        // dot product;
        let sum = 0
        for (let k = 0; k < matrixWeights; k++) {
          sum += matrixWeights.data[j][k] * matrixVariables.data[k][j]
        }
        result.data[i][j] = sum
      }
    }
    return result
  }
  multiply = (n) => {
    // scalar product
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
          this.data[i][j] *= n
      }
    }
  }
  static fromArray(array) {
    let m = new Matrix(arr.length, 1)
    for (let i = 0; i < arr.length; i++) {
      m.data[i][0] = array[i];
    } 
    return m
  }
  toArray() {
    let array = []
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        array.push(this.data[i][j])
      }
    }
  }
  map(func) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let val = this.data[i][j]
        this.data[i][j] = func(val);
      }
    }
  }
  print = () => {
    console.log(this.data)
  }
}
