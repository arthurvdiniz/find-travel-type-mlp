<template>
  <div class="main-content">
    <div class="text-info">
      <h2 class="title">Encontre sua viagem interplanetária</h2>
      <hr />
      <div>
        <h3 class="sub-title">Espectroscopia</h3>
        <p class="text">
          São técnicas de levantamento de dados através da transmissão, absorção ou 
          reflexão da energia radiante de uma amostra. Quando aquecidos ou eletricamente 
          carregados, certos elementos químicos emitem ou absorvem (aparecem como marcas 
          escuras que dividem o espectro) radiação em cores ou comprimentos de onda muito 
          específicos, denominados linhas de emissão e absorção.
        </p>
      </div>
      <div>
        <h3 class="sub-title">Características do Sistema e Tipo de Viagem</h3>
        <div class="wrapper-sub-text-column">
          <div class="sub-text">
            <ul>
              <li>Número de neurônios: 8</li>
              <li>Porcentagem do dataset utispanzado para o treinamento: 90%</li>
              <li>Método utilizado: Multilayer Perceptron</li>
            </ul>
          </div>
          <div class="sub-text viagem">
            <ul>
              <li>Colonização</li>
              <li>Expedição</li>
              <li>Ciência</li>
              <li>Mineração</li>
              <li>Exploração</li>
            </ul>
          </div>
        </div>
      </div>
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
const LEARNING_RATE = 0.5
const WEIGHTS_IH = [
  [11.906571939960395, 9.703724337649303, 10.621147149359714, 9.703218324939462, 10.6210818002821, 0.9633133289219388, -26.90098203009397, 0.8276220091126112],
  [-7.079270581644728, 7.547314200356526, -4.5024475677611955, 7.54730910573783, -4.502356920871997, 0.26729499536551116, -6.989255973863072, 37.60049800567442],
  [-10.282993105702653, -10.197189386999598, -10.00180469546712, -10.1972691078795, -10.001904724932105, 36.61526061363101, -2.868571486892243, 37.27037665405015],
  [-4.559171679657149, -4.622316467335285, -4.628420342163758, -4.622282777475809, -4.628605351623127, -23.657014583332977, -26.112680103864825, -23.432645695838215],
  [-14.725541816470516, -10.706908781589286, 1.4435852859040579, -10.70706626140565, 1.4433441339705726, 18.158643942953855, -2.3682307960819067, -4.4151033035717395],
  [5.658767763306761, -5.8156794625814126, -16.58685024196321, -5.816398694989418, -16.58666708996292, 22.69403463554321, -16.278176464510484, -18.922912082476717],
  [6.997490232906053, 6.59800312087515, 6.616626564484308, 6.597904151766637, 6.616564936389551, 9.30612290583851, 25.260094524550464, -9.663349316028839],
  [-6.428013818399353, -6.3662214371692585, -6.405283041021091, -6.3661229260878285, -6.405381769593665, 35.032779279189874, -0.02498189795075178, 2.370849427736679]
]
const WEIGHTS_HO = [
  [11.072709610761574, 8.277667974258787, -9.441377902679418, -8.65527593700966, 0.09277074961580989, 1.425040814341295, 9.449172276221727, -1.3560267978533387],
  [1.4483536953054867, -8.64101667531503, 5.09659517483669, -2.1268980094800334, 1.7749572477290219, -9.475736576353166, 1.333305412260722, 17.320555407993623],
  [-6.311715463020004, 6.661503335855579, 10.142574852712494, -8.279272465962912, -5.4736718826615745, 7.589417181856173, -5.948832217341678, -12.33955774223642],
  [-10.582347611668581, -2.718768056764045, -9.202635701761483, -3.9646163332621773, 0.4013791618547417, 0.09874504199627078, 4.04397738733696, -5.634578570485096],
  [-0.007976942426545655, -2.376900260816029, -3.3971735308703384, 9.9603261677376, 1.3910341633669288, 0.6470538205659284, -4.611316743122815, -2.6658185480387973]
]

const BIAS_H = [
  [-20.759847299120064],
  [-11.774965600970155],
  [10.032591382329525],
  [20.70316159397609],
  [-0.3822985306397619],
  [-6.592503346783541],
  [-29.2987987654197],
  [-6.2073828746077515]
]

const BIAS_O = [
  [-14.912959551532856],
  [-9.42688611622378],
  [-5.080149739212076],
  [1.8151592340747782],
  [-2.3077746819182314]
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
      // for (let i = 0; i < Math.ceil(datasetLengh * 0.90); i++) {
      //   let rand = Math.ceil(Math.random() * (dataTest.length * 0.90))
      //   dataTrain.push(dataTest[rand]) // esse será o de treinamento
      //   dataTest.splice(rand, 1) // quando acabar o for esse dataSet será o de teste
      // }
      // for (let j = 0; j < 10000; j++) {
      //   let dataShuffle = _.shuffle(dataSet)
      //   console.log(j)
      //   for (let i = 0; i < dataShuffle.length; i++) {
      //     nn.train(dataShuffle[i].input, dataShuffle[i].target)
      //   }
      // }
      // console.log(dataTest)
      // console.log('Resultado: ', nn.feedForward([1,1,1,1,1,0,0,0]))
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
