<template>
  <div class="wrapper-result">
    <v-icon class="icon-travel" size="75" color="black">{{travel.icon}}</v-icon>
    <h1 class="type-travel">{{travel.type}}</h1>
    <h3 class="description-travel">{{travel.description}}</h3>
    <p class="output">{{result}}</p>
    <v-btn fab dark color="black" class="btn-restart" @click="back()">
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: ['result', 'ended'],
  data () {
    return {
      travel: {
        type: '',
        description: ''
      }
    }
  },
  mounted () {
    let highest = this.result[0]
    let position = 0
    this.result.forEach((el, index) => {
      if (el > highest) {
        highest = el
        position = index
      }
    })
    this.travel = this.typesTravel[position]
  },
  methods: {
    back () {
      this.$emit('goBack')
    }
  },
  computed: {
    typesTravel () {
      return [
        {
          type: 'Colonização',
          description: 'Reune as principais características citadas',
          icon: 'mdi-home-variant'
        },
        {
          type: 'Expedição',
          description: 'Descoberta de outros tipos de seres vivos',
          icon: 'mdi-human-greeting'
        },
        {
          type: 'Exploração',
          description: 'Resultados inconclusivos',
          icon: 'mdi-magnify'
        },
        {
          type: 'Mineração',
          description: 'Obtenção de metais preciosos',
          icon: 'mdi-barrel'
        },
        {
          type: 'Ciência',
          description: 'Descoberta de novos materiais',
          icon: 'mdi-flask'
        },
      ]
    }
  }
}
</script>
