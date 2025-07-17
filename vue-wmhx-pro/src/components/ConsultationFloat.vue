<template>
  <!-- 悬浮咨询组件 - 固定在屏幕左侧中间位置 -->
  <!-- 包含咨询图标和垂直排列的文字，点击可触发咨询功能 -->
  <div class="consultation-float">
    <div class="consultation-icon">
      <i class="icon"></i>
    </div>
    <div class="consultation-text">在线咨询</div>
  </div>
</template>

<style scoped>
  /* 基础悬浮容器样式 - 固定定位、蓝色背景、圆角设计 */
  /* z-index: 1000 确保显示在其他内容上方 */
.consultation-float {
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: #165DFF;
  color: white;
  padding: 15px 10px;
  border-radius: 0 8px 8px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.consultation-icon {
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.icon:after {
  content: '💬';
  font-size: 20px;
}

.consultation-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: 14px;
  letter-spacing: 1px;
}

.consultation-float:hover {
  background-color: #0E42D2;
}
</style>