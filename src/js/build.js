import NeuralNetwork from "./neuralNetwork.js"

let dataset = [
    {
        inputs: [0,0],
        targets: [1]
    },
    {
        inputs: [0,0],
        targets: [1]
    },
    {
        inputs: [0,0],
        targets: [1]
    },
    {
        inputs: [0,0],
        targets: [1]
    },
    {
        inputs: [0,0],
        targets: [1]
    },
];

function build() {
    let nn = new NeuralNetwork(2, 2 ,1) 
    //imprime antes de treinar
    console.log(nn.FeedForward([1,0]))

    for (let i = 0; i < 10000; i++) {
       let data = random(dataset)   //só funciona se deixar a entrada aleatória ???????
        // for (data in dataset)  {
        nn.train(data.inputs, data.targets)
        //}
    }
    //imprime após treinar
    console.log(nn.FeedForward([1,0]))
}