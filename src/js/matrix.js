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
  randomize () {
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
  subtract = (n) => {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] -= n
      }
    }
  }
  static multiply (m1, m2) {
    // matrix product
    if (m1.cols !== m2.rows) {
      return undefined
    }
    let result = new Matrix(m1.rows, m2.cols)
    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        // dot product;
        let sum = 0
        for (let k = 0; k < m1.cols; k++) {
          sum += m1.data[i][k] * m2.data[k][j]
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
  static subtract (a, b) {
    // retorna substração de matrix usado no calculo dos erros
    let result = new Matrix(a.rows, b.cols)
    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        result.data[i][j] = a.data[i][j] - b.data[i][j]
      }
    }
    return result
  }
  static transpose (m) {
    let result = new Matrix(m.cols, m.rows)
    for (let i = 0; i < m.rows; i++) {
      for (let j = 0; j < m.cols; j++) {
        result.data[j][i] = m.data[i][j]
      }
    }
    return result
  }
  static fromArray (array) {
    let m = new Matrix(array.length, 1)
    for (let i = 0; i < array.length; i++) {
      m.data[i][0] = array[i]
    }
    return m
  }
  toArray () {
    let arr = []
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        arr.push(this.data[i][j])
      }
    }
    return arr
  }
  map (func) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let val = this.data[i][j]
        this.data[i][j] = func(val)
      }
    }
  }
  static map (matrix, func) {
    let result = new Matrix(matrix.rows, matrix.cols)
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.cols; j++) {
        let val = matrix.data[i][j]
        result.data[i][j] = func(val)
      }
    }
    return result
  }
  print = () => {
    console.log(this.data)
  }
}
