import Matrix from "./matrix"

function sigmoid (value) {
    return 1 / (1 + exp(-value))
}
  
function sigmoid_derivative (value) {
    return sigmoid(value) * (1 - sigmoid(value))
}

class NeuralNetwork {
  constructor (input_nodes, hidden_nodes, output_notes) {
    this.input_nodes = input_nodes
    this.hidden_nodes = hidden_nodes
    this.output_notes = output_notes

    this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes)
    this.weights_ho = new Matrix(this.output_notes, this.hidden_nodes)
    this.weights_ih.randomize()
    this.weights_ho.randomize()

    this.bias_h = new Matrix(this.hidden_nodes, 1)
    this.bias_o = new Matrix(this.output_notes, 1)

    this.learning_rate = 0.1
  }

  feedForward (input_array) {
    let input = Matrix.fromArray(input_array)

    let hidden = Matrix.multiply(this.weights_ih, input)
    hidden.add(this.bias_h)
    // activation function para camada oculta
    hidden.map(sigmoid)
    
    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o)
    // activation function para saida
    output.map(sigmoid)

    return output.toArray;
  }

  train(inputs, targets) {
      let outputs = this.feedForward(inputs)              
      //outputs = Matrix.fromArray(outputs)        
      targets = Matrix.fromArray(targets)

      // calcula erro da saida: erro = targets - outputs
      let output_errors = Matrix.subtract(targets, outputs)

      // gradiente da camada de saida
      let gradients = outputs.map(sigmoid_derivative)
      gradients.multiply(output_errors)
      gradients.multiply(this.learning_rate)
      // deltas da oculta -> saida
      let input = Matrix.fromArray(input_array)
      let hidden = Matrix.multiply(this.weights_ih, input)
      let hiddenTrans = Matrix.transpose(hidden)
      let weights_ho_deltas = Matrix.multiply(gradients, hiddenTrans)
      // atualiza os pesos da oculta -> saida
      this.weights_ho.add(weights_ho_deltas)
      // atualiza o bias nem sabia disso?????? (de acordo com o gradiente)
      this.bias_o.add(gradients)

      //calcula erro da camada oculta
      let hoTrans = Matrix.transpose(this.weights_ho)
      let hidden_errors = Matrix.multiply(hoTrans, output_errors)     

      // gradiente da camada oculta
      let hidden_gradients = Matrix.map(hidden, sigmoid_derivative)
      hidden_gradients.multiply(hidden_errors)
      hidden_gradients.multiply(this.learning_rate)
      // calcula deltas do input -> oculta
      let inputTrans = Matrix.transpose(input)
      let weight_ih_deltas = Matrix.multiply(hidden_gradients, inputTrans)
      // atualiza os pesos da entrada -> oculta
      this.weights_ih.add(weight_ih_deltas)
      // atualiza o bias 
      this.bias_h.add(hidden_gradients)
  }
}
