<template>
  <div class="main-content">
    <div class="text-info">
      <h2 class="title">Encontre sua viagem interplanetária</h2>
      <p class="text">teste</p>
    </div>
    <div class="content">
      <form-caracteristicas @clickedBtn="startNN($event)" v-if="!isLoading && !ended"/>
      <rocket v-if="isLoading"/>
      <resultado :result="result" :ended="ended" @goBack="ended = false; result = []" v-if="ended"/>
    </div>
  </div>
</template>

<script>
import FormCaracteristicas from '@/components/FormCaracteristicas'
import Rocket from '@/components/Rocket'
import Resultado from '@/components/Resultado'
import NeuralNetwork from '@/js/neuralNetwork'

const N_INPUTS = 8
const N_OUTPUT = 5
const N_NEURONIOS = 10
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
      console.log(inputs)
      this.ended = false
      this.isLoading = true
      let nn = new NeuralNetwork(N_INPUTS, N_NEURONIOS, N_OUTPUT, LEARNING_RATE)
      this.result = nn.feedForward(inputs)
      console.log(this.result)
      console.log(nn)
      setTimeout(() => {
        this.isLoading = false
        this.ended = true
      }, 5000)
    }
  }
}
</script>
