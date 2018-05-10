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
        color="primary">
        </v-switch>
      </div>
      <v-btn class="btn-find" @click="findOut()">Descobrir</v-btn>
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
          name: 'Este planeta possui Água?',
          icon: 'mdi-water',
          value: false
        },
        {
          id: 1,
          name: 'Oxigênio',
          icon: 'mdi-gas-cylinder',
          value: false
        },
        {
          id: 2,
          name: 'Minérios',
          icon: 'mdi-history',
          value: false
        },
        {
          id: 3,
          name: 'Terra cultivável',
          icon: 'mdi-tree',
          value: false
        },
        {
          id: 4,
          name: 'Etc1',
          icon: 'mdi-history',
          value: false
        },
        {
          id: 5,
          name: 'Etc2',
          icon: 'mdi-history',
          value: false
        },
        {
          id: 6,
          name: 'Etc3',
          icon: 'mdi-history',
          value: false
        },
        {
          id: 7,
          name: 'Etc4',
          icon: 'mdi-history',
          value: false
        }
      ],
      disable: false
    }
  },
  methods: {
    findOut () {
      let result = []
      this.disable = true
      this.inputs.forEach(el => {
        if (el.value) {
          result.push(1)
        } else {
          result.push(0)
        }
      })
      this.$emit('findOut', result)
    }
  }
}
</script>
