<template>
  <div class="main-content">
    <div class="text-info">
      <h2 class="title">Encontre sua viagem interplanetária</h2>
      <p class="text">teste</p>
    </div>
    <div class="content">
      <form-caracteristicas @clickedBtn="startNN($event)" v-if="true"/>
      <rocket v-if="false"/>
    </div>
  </div>
</template>

<script>
import FormCaracteristicas from '@/components/FormCaracteristicas'
import Rocket from '@/components/Rocket'
import NeuralNetwork from '@/js/neuralNetwork'

const N_INPUTS = 8
const N_OUTPUT = 3
const N_NEURONIOS = 8
const LEARNING_RATE = 0.5
// const target = [1, 1, 1]
export default {
  components: {
    FormCaracteristicas,
    Rocket
  },
  methods: {
    startNN (inputs) {
      let nn = new NeuralNetwork(N_INPUTS, N_NEURONIOS, N_OUTPUT, LEARNING_RATE)
      console.log(inputs)
      // for (let i = 0; i < 50; i++) {
      //  nn.train(inputs, target)
      //}
      console.log(nn.feedForward(inputs))
    }
  }
}
</script>
