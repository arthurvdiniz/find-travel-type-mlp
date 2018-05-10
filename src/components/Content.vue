<template>
  <div class="main-content">
    <div class="text-info">
      <h2 class="title">Encontre sua viagem interplanetária</h2>
      <p class="text">teste</p>
    </div>
    <div class="content">
      <form-caracteristicas v-if="true"/>
      <rocket v-if="false"/>
    </div>
  </div>
</template>

<script>
import FormCaracteristicas from '@/components/FormCaracteristicas'
import Rocket from '@/components/Rocket'
export default {
  components: {
    FormCaracteristicas,
    Rocket
  }
}
</script>
