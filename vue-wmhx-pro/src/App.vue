<script setup>
import { onUnmounted } from 'vue';
import Header from './components/Header.vue'
import ConsultationFloat from './components/ConsultationFloat.vue'
import BackToTop from './components/BackToTop.vue';
import { useConfig } from './services/configService';

// 使用配置服务
const { cleanup } = useConfig();

// 组件卸载时清理资源
onUnmounted(() => {
  cleanup();
});
</script>

<template>
  <div id="app">
    <Header />
    <router-view />
    <ConsultationFloat />
    <BackToTop />
  </div>
</template>
<style scoped>
/* 主应用样式 */
#app {
  min-height: 100vh;
}
</style>
