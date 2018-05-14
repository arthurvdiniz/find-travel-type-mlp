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
        <h3 class="sub-title">Características do Sistema e Tipos de Viagem</h3>
        <div class="wrapper-sub-text-column">
          <div class="sub-text">
            <ul>
              <li>Neurônios da camada oculta: 8</li>
              <li>Método utilizado: Multilayer Perceptron</li>
              <li>Metodo de treinamento: Interativo</li>
              <li>Porcentagem do dataset utilizado para o treinamento: 90%</li>
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
  [-9.74906989686154, -10.815732026292125, -10.447521889421937, -10.815811019831223, -10.447536898467472, 15.924159365642824, -2.2393640437065385, 0.27220400725739774],
  [6.001967694397773, 3.7959281881420734, 3.605685087998032, 3.79585851102107, 3.605756206134235, -21.61169696505535, -21.991932458520775, -22.255336427446146],
  [-2.963669689805822, 5.642952080774242, -2.3962710948247787, 5.642850206963004, -2.3969500285217853, -20.919476119020064, -1.6685818870615967, -16.57570637173509],
  [7.931915980044474, -8.345849573951478, -8.413728912480375, -8.345814496471467, -8.41376040175747, -30.100126371660583, 21.02909624971651, 26.78138698098324],
  [-6.329286605750881, 7.884344576032864, -6.672937098241949, 7.884255237559875, -6.67407001550311, 3.922303189138663, -6.507597818900648, -9.762845031294066],
  [3.135422714266181, 0.7850565240999834, 3.3395316463193523, 0.7849074471921316, 3.3400850956711508, 15.29130050097304, 22.690737307794304, -14.41705107550684],
  [8.819709647741778, 8.644657556442787, 8.36966006061951, 8.644583804746713, 8.369644669453407, 43.82016682363402, 0.538182787804154, 0.23985177865414067],
  [0.8279284287968502, 1.044076338515684, 1.0915540963348453, 1.0437631328391985, 1.0912889465583095, 13.092027999006863, -4.233783344723333, 14.980453455225216]
]
const WEIGHTS_HO = [
  [-11.70234928580807, 1.6526366908201655, -2.6553963064431936, -0.15519126618581727, 0.19348946450129403, -0.09788367856678142, 10.656216518409435, -1.6975292417296768],
  [17.662151807737118, -4.226113682899668, -11.231426376030072, -8.906911269070497, -2.170014624980338, 8.275711258666973, 3.7527706371083633, -4.5699541024472],
  [2.2204246111521675, -8.886317109012117, 1.4681651328348857, 9.195304439688044, 9.662617013358838, -10.220192964535228, -10.821956742645073, 11.817524475541473],
  [-0.7678713053903077, -6.115176176478717, 1.3809949320719546, 1.3370960585503284, -0.2295725883277203, 5.243617945977141, -5.734591517546905, -7.994027847376529],
  [2.0007951086562916, 7.761357814287981, 1.5397274350611319, -3.2190668602851087, 1.2376026777551685, -4.145681812745147, -8.88958989150281, -3.4431735973310404]
]

const BIAS_H = [
  [32.147738089639105],
  [2.720508754722093],
  [11.591207976606634],
  [-0.611469562620275],
  [-15.687899289433462],  
  [-19.019834938114496],
  [-39.00684527378384],
  [-4.88782904793107]
]

const BIAS_O = [  
  [-3.843368012391431],
  [-11.439948314739205],
  [-8.592783761804066],
  [-0.9322849603707319],
  [-3.1047530424666534]
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
      //Criando o dataset de treinamento e o de teste
      //let nn = new NeuralNetwork(N_INPUTS, N_NEURONIOS, N_OUTPUT, LEARNING_RATE, null, null, null, null)
      //let datasetLengh = dataSet.length
      //let dataTest = [...dataSet]
      //let dataTrain = []
      //for (let i = 0; i < Math.ceil(datasetLengh * 0.90); i++) {
      //  let rand = Math.ceil(Math.random() * (dataTest.length * 0.90))
      //  dataTrain.push(dataTest[rand]) // esse será o de treinamento
      //  dataTest.splice(rand, 1) // quando acabar o for esse dataSet será o de teste
      //}
      //for (let j = 0; j < 10000; j++) {
      //  let dataShuffle = _.shuffle(dataSet)
      //  console.log(j)
      //for (let i = 0; i < dataShuffle.length; i++) {
      //  nn.train(dataShuffle[i].input, dataShuffle[i].target)
      // }
      //}
      //console.log(dataTest)
      //console.log('Resultado: ', nn.feedForward([1,1,1,1,1,0,0,0]))
      //console.log(nn)

      // TESTE
      //let nn = new NeuralNetwork(N_INPUTS, N_NEURONIOS, N_OUTPUT, LEARNING_RATE, WEIGHTS_IH, WEIGHTS_HO, BIAS_H, BIAS_O)
      //let datatestshuffle = _.shuffle(datasetTest)
      //for (let i = 0; i < datasetTest.length; i++) {
      //  console.log('Input: ', datatestshuffle[i].input)
      //  console.log('Target: ', datatestshuffle[i].target)
      //  console.log('Resultado: ', nn.feedForward(datatestshuffle[i].input))
      //  console.log('-----------------------------------------------------')
      //}

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
