<template>
  <div class="wrapper-form">
    <v-container fluid class="carac-inputs">
      <v-switch
      v-for="el in inputs" 
      :key="el.id"
      :label="el.name" 
      :prepend-icon="el.icon"
      color="primary"
      v-model="el.value">
      </v-switch>
      <v-btn @click="findOut()">Descobrir</v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputs: [
        {
          id: 0,
          name: 'Água',
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
