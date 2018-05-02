<template>
  <main class="content">
    <Header/>
    <Content/>
  </main>
</template>

<script>
import Header from '@/components/shared/Header'
import Content from '@/components/Content'
export default {
  components: {
    Header,
    Content
  }
}
</script>
