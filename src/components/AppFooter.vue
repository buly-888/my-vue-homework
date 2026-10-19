<script setup>
defineProps({
  author: { type: String, default: '朱峻贤' },
  year:   { type: Number, default: new Date().getFullYear() }
})
</script>

<template>
  <footer class="app-footer">
    <p>© {{ year }} {{ author }} · 重庆工程学院 · 计算机科学与技术</p>
    <p class="tip">Vue3 组件化 + 路由 + Pinia 实验</p>
  </footer>
</template>

<style scoped>
.app-footer {
  text-align: center;
  color: #94a3b8;
  font-size: 13px;
  padding: 16px 0;
  border-top: 1px solid #e2e8f0;
  margin-top: 20px;
}
.tip { margin-top: 4px; font-size: 12px; }
</style>