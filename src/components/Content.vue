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
import { dataSet, datasetTest } from '@/js/dataSet'

const N_INPUTS = 8
const N_OUTPUT = 5
const N_NEURONIOS = 8
const LEARNING_RATE = 0.3
const WEIGHTS_IH = [
  [-4.502223579897518, 5.434471268890443, 2.270600895874126, 5.488910982225953, 5.510642794608439, 38.04560239367708, 17.739805016325107, -16.005671691145196],
  [-0.9560333421145072, -1.37057673181022, -1.2453465086086473, -0.7659747184302189, -1.3055371389184756, -1.0557256754713824, -1.2155888131111037, -0.7017733466735459],
  [-0.0058710381956233555, 0.1398866993957646, 0.21828489570129853, 0.11111665910750586, 0.05326383936174966, 21.85397172661459, -11.469545255183359, -9.730279320320495],
  [-5.356063986245051, -3.9166397660125964, -2.406019481219256, -3.135037756675588, -3.123282186546911, 13.27429482239355, 1.8804401926571404, 18.62646452812311],
  [5.664260224503057, 4.649659300096812, 3.5621708120664737, 4.768704495111292, 4.692113548556293, -20.507644750479738, -0.00898394779125331, -19.557417369094797],
  [-1.1721788314554367, -1.337078876340981, -1.3575032771170552, -1.0115350707907858, -1.2973929444105499, -2.0839307496256265, -0.6745672074610937, -0.30024144987267365],
  [-0.016251071147503134, -0.18060164444234728, -0.09922030428011822, -0.17841031799516488, -0.144598671408508, -11.682034071928125, 11.742602828473848, -6.739880903550197],
  [-1.0331259174387175, 1.0939385020309043, 0.5385782282571052, 0.8047936327795986, 0.781851338030817, -12.44622184576267, -10.268242783725192, -12.553280524712614]
]
const WEIGHTS_HO = [
  [-1.4127356544800023, 0.422766032613213, -0.737373655311879, -2.2662599286635268, -1.1449737822829162, 0.640838872864329, -0.35413849135215314, -0.5884113055583626],
  [10.723032915995924, 0.23266440084484452, 3.4903764322658617, -1.3655589946020226, -5.805447392011661, 0.08861712558659655, -3.9191716346267147, -1.9185294597203035],
  [-11.055773756152364, 0.4353108424477067, -3.0181778965580386, 7.345083715429616, -4.614383460712076, 1.1032508041179803, -0.8979653962875991, -1.3300712221235864],
  [2.5836278208053063, 0.20773350687790748, -5.187091146453486, -6.544797923967383, 4.460709284794882, 0.6497596332502147, 2.4475801095261245, -3.706150782352551],
  [-3.5878550965823033, 0.20477481936476802, 2.3089583695506843, -3.798258744562124, 0.6643085278677279, 0.26163766111732356, -2.599968193523604, 6.363607380218804]
]

const BIAS_H = [
  [-20.085193542930806],
  [-3.787697365610858],
  [5.253765058448061],
  [0.24239341306037993],
  [-2.2228578102398813],
  [-4.251057936453844],
  [-5.531956327662177],
  [5.370910587191083]
]

const BIAS_O = [
  [-4.576900680791601],
  [-6.707657835266273],
  [0.4308482440630284],
  [-1.748577743807201],
  [-3.1300319228336204]
]

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
      // TREINAMENTO
      // Criando o dataset de treinamento e o de teste
      // let nn = new NeuralNetwork(N_INPUTS, N_NEURONIOS, N_OUTPUT, LEARNING_RATE, null, null, null, null)
      // let datasetLengh = dataSet.length
      // let dataTest = [...dataSet]
      // let dataTrain = []
      // for (let i = 0; i < datasetLengh * 0.75; i++) {
      //   let rand = Math.ceil(Math.random() * (dataTest.length * 0.75))
      //   dataTrain.push(dataTest[rand]) // esse será o de treinamento
      //   dataTest.splice(rand, 1) // quando acabar o for esse dataSet será o de teste
      // }
      // for (let j = 0; j < 10000; j++) {
      //   let dataShuffle = _.shuffle(dataTrain)
      //   console.log(j)
      //   for (let i = 0; i < dataShuffle.length; i++) {
      //     nn.train(dataShuffle[i].input, dataShuffle[i].target)
      //   }
      // }
      // console.log(dataTest)
      // console.log('Resultado: ', nn.feedForward(inputs))
      // console.log(nn)

      // TESTE
      // let nn = new NeuralNetwork(N_INPUTS, N_NEURONIOS, N_OUTPUT, LEARNING_RATE, WEIGHTS_IH, WEIGHTS_HO, BIAS_H, BIAS_O)
      // let datatestshuffle = _.shuffle(datasetTest)
      // for (let i = 0; i < datasetTest.length; i++) {
      //   console.log('Input: ', datatestshuffle[i].input)
      //   console.log('Target: ', datatestshuffle[i].target)
      //   console.log('Resultado: ', nn.feedForward(datatestshuffle[i].input))
      //   console.log('-----------------------------------------------------')
      // }

      // FRONTEND
      let nn = new NeuralNetwork(N_INPUTS, N_NEURONIOS, N_OUTPUT, LEARNING_RATE, WEIGHTS_IH, WEIGHTS_HO, BIAS_H, BIAS_O)
      this.result = nn.feedForward(inputs)
      setTimeout(() => {
        this.isLoading = false
        this.ended = true
      }, 5000)
    }
  }
}
</script>
