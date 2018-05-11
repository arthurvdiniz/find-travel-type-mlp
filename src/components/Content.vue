<template>
  <div class="main-content">
    <div class="text-info">
      <h2 class="title">Encontre sua viagem interplanetária</h2>
      <p class="text">teste</p>
    </div>
    <div class="content">
      <transition name="component-fade" mode="out-in">
        <form-caracteristicas @clickedBtn="startNN($event)" v-if="!isLoading && !ended"/>
        <rocket v-if="isLoading"/>
        <resultado :result="result" :ended="ended" @goBack="ended = false; result = []" v-if="ended"/>
      </transition>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

import FormCaracteristicas from '@/components/FormCaracteristicas'
import Rocket from '@/components/Rocket'
import Resultado from '@/components/Resultado'
import NeuralNetwork from '@/js/neuralNetwork'
import { dataSet } from '@/js/dataSet'

const N_INPUTS = 8
const N_OUTPUT = 5
const N_NEURONIOS = 8
const LEARNING_RATE = 0.3
let dataset = [
    {
        inputs: [0, 0],
        targets: [0]
    },
    {
        inputs: [0, 1],
        targets: [1]
    },
    {
        inputs: [1, 0],
        targets: [1]
    },
    {
        inputs: [1, 1],
        targets: [0]
    },
];
export default {
  components: {
    FormCaracteristicas,
    Rocket,
    Resultado
  },
  data () {
    return {
      isLoading: false,
      ended: false,
      result: []
    }
  },
  methods: {
    startNN (inputs) {
      this.ended = false
      this.isLoading = true
      let nn = new NeuralNetwork(N_INPUTS, N_NEURONIOS, N_OUTPUT, LEARNING_RATE)
      // Criando o dataset de treinamento e o de teste
      let datasetLengh = dataSet.length
      let dataTest = [...dataSet]
      let dataTrain = []
      for (let i = 0; i < datasetLengh * 0.75; i++) {
        let rand = Math.ceil(Math.random() * (dataTest.length * 0.75))
        dataTrain.push(dataTest[rand]) // esse será o de treinamento
        dataTest.splice(rand, 1) // quando acabar o for esse dataSet será o de teste
      }
      for (let j = 0; j < 100; j++) {
        let dataShuffle = _.shuffle(dataTrain)
        for (let i = 0; i < dataShuffle.length; i++) {
          nn.train(dataShuffle[i].input, dataShuffle[i].target)
        }
      }
      console.log('Resultado: ', nn.feedForward(inputs))
      console.log(nn)
      setTimeout(() => {
        this.isLoading = false
        this.ended = true
      }, 5000)
    }
  }
}
</script>
