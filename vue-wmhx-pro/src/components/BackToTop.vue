<template>
  <!-- 回到顶部悬浮组件 - 固定在屏幕左侧中间偏下位置 -->
  <!-- 点击后平滑滚动到页面顶部，提升用户体验 -->
  <div class="back-to-top" @click="scrollToTop">
    <div class="back-icon">
      <i class="icon"></i>
    </div>
    <div class="back-text">顶部</div>
  </div>
</template>

<script setup>
  // 平滑滚动到页面顶部的方法
  // 使用window.scrollTo实现平滑过渡效果
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
</script>

<style scoped>
  /* 回到顶部容器样式 - 白色背景配蓝色边框，与咨询组件视觉统一 */
  /* 位于咨询组件下方，形成功能组 */
.back-to-top {
  position: fixed;
  left: 0;
  top: calc(50% + 120px);
  transform: translateY(-50%);
  background-color: white;
  color: #165DFF;
  border: 1px solid #165DFF;
  padding: 15px 10px;
  border-radius: 0 8px 8px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.back-icon {
  width: 40px;
  height: 40px;
  background-color: #165DFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.icon:after {
  content: '↑';
  font-size: 20px;
  color: white;
}

.back-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: 14px;
  letter-spacing: 1px;
}

.back-to-top:hover {
  background-color: #f5f9ff;
}
</style>