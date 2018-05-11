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
const LEARNING_RATE = 0.5

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
      // console.log(inputs)
      this.ended = false
      this.isLoading = true
      let nn = new NeuralNetwork(N_INPUTS, N_NEURONIOS, N_OUTPUT, LEARNING_RATE)
      // let contData = 0
      // let contTrain = 0
      // let endData = false
      // let endTrain = false
      // const dataLoop = () => {
      //   setTimeout(() => {
      //     nn.train(dataSet[contData].input, dataSet[contData].target)
      //     contData++
      //     if (contData < dataSet.length) {
      //       dataLoop()
      //     } else {
      //       endData = true
      //     }
      //   }, 500)
      // }
      // const trainLoop = () => {
      //   setTimeout(() => {
      //     endTrain = false
      //     endData = false
      //     dataLoop()
      //     contTrain++
      //     if (contTrain < 2) {
      //       trainLoop()
      //     } else {
      //       endTrain = true
      //     }
      //   }, 50)
      // }
      // trainLoop()
      // if (endData && endTrain) {
      //   this.isLoading = false
      //   this.ended = true
      // }
    
      // let dataShuffle = _.shuffle(dataSet)
      //for (let j = 0; j < 10000; j++) {
      //  let element = Math.floor(Math.random() * dataSet.length)
      console.log(dataSet[0].input)
      console.log(dataSet[0].target)
      nn.train(dataSet.input, dataSet.target)
      //}
      console.log(nn.feedForward(inputs))
      setTimeout(() => {
        this.isLoading = false
        this.ended = true
      }, 5000)
    }
  }
}
</script>
