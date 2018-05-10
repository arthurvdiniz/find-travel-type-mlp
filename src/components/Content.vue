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
import FormCaracteristicas from '@/components/FormCaracteristicas'
import Rocket from '@/components/Rocket'
import Resultado from '@/components/Resultado'
import NeuralNetwork from '@/js/neuralNetwork'

const N_INPUTS = 8
const N_OUTPUT = 3
const N_NEURONIOS = 8
const LEARNING_RATE = 0.5
// const target = [1, 1, 1]

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
<<<<<<< HEAD
      console.log(inputs)
      // for (let i = 0; i < 50; i++) {
      //  nn.train(inputs, target)
      //}
      console.log(nn.feedForward(inputs))
=======
      this.result = nn.feedForward(inputs)
      console.log(this.result)
      console.log(nn)
      setTimeout(() => {
        this.isLoading = false
        this.ended = true
      }, 5000)
>>>>>>> 40a0d40201bd0808fc9c543cd1d43a2ab1a176da
    }
  }
}
</script>
