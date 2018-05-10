<template>
  <div class="wrapper-form">
    <h2 class="title">Caractéristicas do Planeta</h2>
    <div class="inputs">
      <div
      class="unique-input"
      v-for="el in inputs"
      :key="el.id">
        <span class="label">{{el.name}}</span>
        <v-switch
        v-model="el.value"
        :append-icon="el.icon"
        hide-details
        class="switch"
        color="black">
        </v-switch>
      </div>
      <v-btn fab dark color="black" class="btn-find" @click="findOut()">
        <v-icon>mdi-rocket</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputs: [
        {
          id: 0,
          name: 'Presença de água?',
          icon: 'mdi-water',
          value: false
        },
        {
          id: 1,
          name: 'Presença parcial dos elementos para manutenção da vida?',
          icon: 'mdi-gas-cylinder',
          value: false
        },
        {
          id: 2,
          name: 'Não abundãncia de matérias pesados?',
          icon: 'mdi-shovel',
          value: false
        },
        {
          id: 3,
          name: 'Temperatura suportável?',
          icon: 'mdi-thermometer',
          value: false
        },
        {
          id: 4,
          name: 'Gravidade suportável?',
          icon: 'mdi-buffer',
          value: false
        },
        {
          id: 5,
          name: 'Presença de marcadores biológicos?',
          icon: 'mdi-biohazard',
          value: false
        },
        {
          id: 6,
          name: 'Alta concentração rochosa?',
          icon: 'mdi-image-filter-hdr',
          value: false
        },
        {
          id: 7,
          name: 'Presença de espectros ainda não conhecidos?',
          icon: 'mdi-waves',
          value: false
        }
      ]
    }
  },
  methods: {
    findOut () {
      let result = []
      this.inputs.forEach(el => {
        if (el.value) {
          result.push(1)
        } else {
          result.push(0)
        }
      })
      this.$emit('clickedBtn', result)
    }
  }
}
</script>
