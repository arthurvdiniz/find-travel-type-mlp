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
  [-84.83549324948804, -107.63451495895795, 1150.174903781292, -370.95707138754324, -88.30556517432603, 1213.515660011074, -97.11910163753345, -91.20202024151303],
  [-20.612878396551512, -31.98930351398063, -60.10628711110873, -22.472577574918674, -30.43397045371707, -86.68150548589604, -90.3087820900481, -83.93097665957448],
  [29.78645999789755, 73.25128632828164, 93.0502302206896, 22.648214263102727, 32.84483444770577, 64.1854672483401, 58.515608971247154, 59.93669762522044],
  [-13.502994867943274, 1286.7528190148582, -73.73505847616991, -245.3063819079519, -275.3645909525057, 218.7777222311213, -266.59301761017963, -271.84216491635107],
  [14.048948305176019, 23.72648819102705, 24.19406669715365, 108.59845206416205, 27.724698462664914, -791.5562966489942, 28.25328852790147, 24.92313454003435],
  [-119.1866865023755, -869.8871720968132, -1088.540936633168, -1255.6938208830113, -1047.898266261864, 168.183996086835, -1470.4364517886324, 656.572124489366],
  [-570.1401441372966, -474.03930574084455, -73.61531082784036, -852.0276396723782, -713.2957504072399, -876.3421458270168, -234.2687723566942, -830.6280331963583],
  [2.7266139563294747, -280.05904372775365, -31.122789153674763, -289.4460408983735, -74.36292342882666, 215.07311197628144, -48.228937020796636, -281.02281508236223],
]
const WEIGHTS_HO = [
  [-12484.246989602578, 8170.900900044274, -8317.002100446362, 8398.38642588003, 1616.7856134702597, 156862.34739030167, 98270.31873819904, 12389.700553300407],
  [3196393.856047441, 4105621.2250931156, -4767099.300177647, 1603574.5084926363, -10391209.134340566, 75153807.93357086, 45829241.59225125, 15116330.084452419],
  [-171.5961802904382, -5797545.329366631, 5742673.480882696, -5772329.324747267, 5706853.654553617, -56117387.82775886, -62059873.30538041, -17734951.09329977],
  [28.893818943319104, -1592308.1961513115, 1661804.1295023018, -1672936.4678151987, 2416317.706900422, -42791365.606242076, -12484883.222695477, -2785698.1080971644],
  [-4387158.949023279, 1861891.4464813303, -1030843.8155655086, 5418209.180082143, 6027532.685103094, 2098501.6751088523, 14813560.43237496, 890.9029996726441]
]

const BIAS_H = [
  [652.0852370455078],
  [14.379962870829672],
  [124.47345870094695],
  [1230.885809385325],
  [-664.3876648463774],
  [-1146.6084904382972],
  [-1038.6802982024424],
  [-64.72187508733805]
]

const BIAS_O = [
  [-102.07945146940031],
  [-32718.14758068368],
  [29747.91470020549],
  [10949.560891506022],
  [-440.52631492991935]
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
      let nn = new NeuralNetwork(N_INPUTS, N_NEURONIOS, N_OUTPUT, LEARNING_RATE, null, null, null, null)
      // TREINAMENTO
      // Criando o dataset de treinamento e o de teste
      let datasetLengh = dataSet.length
      let dataTest = [...dataSet]
      let dataTrain = []
      for (let i = 0; i < datasetLengh * 0.75; i++) {
        let rand = Math.ceil(Math.random() * (dataTest.length * 0.75))
        dataTrain.push(dataTest[rand]) // esse será o de treinamento
        dataTest.splice(rand, 1) // quando acabar o for esse dataSet será o de teste
      }
      for (let j = 0; j < 10000; j++) {
        let dataShuffle = _.shuffle(dataTrain)
        console.log(j)
        for (let i = 0; i < dataShuffle.length; i++) {
          nn.train(dataShuffle[i].input, dataShuffle[i].target)
        }
      }
      console.log(dataTest)
      console.log('Resultado: ', nn.feedForward(inputs))
      console.log(nn)

      // TESTE
      // let datatestshuffle = _.shuffle(datasetTest)
      // for (let i = 0; i < datasetTest.length; i++) {
      //   console.log('Input: ', datatestshuffle[i].input)
      //   console.log('Target: ', datatestshuffle[i].target)
      //   console.log('Resultado: ', nn.feedForward(datatestshuffle[i].input))
      //   console.log('-----------------------------------------------------')
      // }
      setTimeout(() => {
        this.isLoading = false
        this.ended = true
      }, 5000)
    }
  }
}
</script>
