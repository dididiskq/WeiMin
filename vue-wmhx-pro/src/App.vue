<script setup>
</script>

<template>
  <div id="app">
    <Header />
    <router-view />
    <ConsultationFloat />
    <BackToTop />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import ConsultationFloat from './components/ConsultationFloat.vue'
import BackToTop from './components/BackToTop.vue';
</script>
<style scoped>
/* 主应用样式 */
#app {
  min-height: 100vh;
}
</style>
