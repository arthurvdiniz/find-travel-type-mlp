import Matrix from './matrix'

function sigmoid (value) {
  return 1 / (1 + Math.exp(-value))
}

function sigmoidDerivative (value) {
  return sigmoid(value) * (1 - sigmoid(value))
}

export default class NeuralNetwork {
  constructor (inputNodes, hiddenNodes, outputNodes, learningRate) {
    this.inputNodes = inputNodes
    this.hiddenNodes = hiddenNodes
    this.outputNodes = outputNodes

    this.weights_ih = new Matrix(this.hiddenNodes, this.inputNodes)
    this.weights_ho = new Matrix(this.outputNodes, this.hiddenNodes)
    this.weights_ih.randomize()
    this.weights_ho.randomize()

    this.bias_h = new Matrix(this.hiddenNodes, 1)
    this.bias_o = new Matrix(this.outputNodes, 1)
    this.bias_h.add(1)
    this.bias_o.add(1)

    this.learningRate = learningRate
  }

  feedForward (inputArray) {
    let input = Matrix.fromArray(inputArray)

    let hidden = Matrix.multiply(this.weights_ih, input)
    hidden.add(this.bias_h)
    // activation function para camada oculta
    hidden.map(sigmoid)

    let output = Matrix.multiply(this.weights_ho, hidden)
    output.add(this.bias_o)
    // activation function para saida
    output.map(sigmoid)

    return output.toArray()
  }

  train (inputs, targets) {
    let outputs = this.feedForward(inputs)
    // outputs = Matrix.fromArray(outputs)
    targets = Matrix.fromArray(targets)

    // calcula erro da saida: erro = targets - outputs
    let outputErros = Matrix.subtract(targets, outputs)

    // gradiente da camada de saida
    let gradients = outputs.map(sigmoidDerivative)
    gradients.multiply(outputErros)
    gradients.multiply(this.learningRate)
    // deltas da oculta -> saida
    let input = Matrix.fromArray(inputs)
    let hidden = Matrix.multiply(this.weights_ih, input)
    let hiddenTrans = Matrix.transpose(hidden)
    let wightsHODeltas = Matrix.multiply(gradients, hiddenTrans)
    // atualiza os pesos da oculta -> saida
    this.weights_ho.add(wightsHODeltas)
    // atualiza o bias nem sabia disso?????? (de acordo com o gradiente)
    this.bias_o.add(gradients)

    // calcula erro da camada oculta
    let hoTrans = Matrix.transpose(this.weights_ho)
    let hiddenErros = Matrix.multiply(hoTrans, outputErros)
    // gradiente da camada oculta
    let hiddenGradients = Matrix.map(hidden, sigmoidDerivative)
    hiddenGradients.multiply(hiddenErros)
    hiddenGradients.multiply(this.learningRate)
    // calcula deltas do input -> oculta
    let inputTrans = Matrix.transpose(input)
    let weightIHDeltas = Matrix.multiply(hiddenGradients, inputTrans)
    // atualiza os pesos da entrada -> oculta
    this.weights_ih.add(weightIHDeltas)
    // atualiza o bias
    this.bias_h.add(hiddenGradients)
  }
}
