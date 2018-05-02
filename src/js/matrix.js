export default class Matrix {

  constructor(rows, cols) {
    this.rows = rows
    this.cols = cols
    this.matrix = []

    for (let i = 0; i < this.rows; i++) {
      this.matrix[i] = []
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = 0
      }
    }
  }
  
  randomize = () => {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = Math.random()
      }
    }
  }
  
  add = (n) => {
    if (n instanceof Matrix) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.matrix[i][j] += n.matrix[i][j]
        }
      }
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.matrix[i][j] += n
        }
      }
    }
  }
  
  multiply = (n) => {
    if (n instanceof Matrix) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.matrix[i][j] *= n.matrix[i][j]
        }
      }
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.matrix[i][j] *= n
        }
      }
    }
  }
}
