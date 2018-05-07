import Matrix from "./matrix"

function sigmoid (value) {
    return 1 / (1 + exp(-value));
}
  
function sigmoid_derivative (value) {
    return value * (1 - value);
}

class NeuralNetwork { 
    constructor(input_nodes, hidden_nodes, output_notes) {
        this.input_nodes = input_nodes
        this.hidden_nodes = hidden_nodes
        this.output_notes = output_notes

        this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes)
        this.weights_ho = new Matrix(this.output_notes, this.hidden_nodes)
        this.weights_ih.randomize();
        this.weights_ho.randomize();

        this.bias_h = new Matrix(this.hidden_nodes, 1);
        this.bias_o = new Matrix(this.output_notes, 1);
    }

    feedForward(input_array) {

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
        outputs = Matrix.fromArray(outputs)
        targets = Matrix.fromArray(targets)
        // calcula erro erro = targets - outputs
        let output_errors = Matrix.subtract(targets, outputs)
        //calcula erro da camada oculta
        let mTrans = Matrix.transpose(this.weights_ho)
        let hidden_errors = Matrix.multiply(mTrans, output_errors)
    }
}