<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="page">
    <h2>404 · 页面不存在</h2>
    <p>你访问的地址不存在，请检查 URL 是否正确。</p>
    <button class="back-btn" @click="router.push({ name: 'Home' })">返回首页</button>
  </div>
</template>

<style scoped>
.page { background: #fff; padding: 40px 30px; border-radius: 16px; text-align: center; box-shadow: 0 4px 14px rgba(0,0,0,0.06); }
.page h2 { color: #ef4444; margin-bottom: 12px; }
.page p { color: #475569; margin-bottom: 20px; }
.back-btn { background: #3b82f6; color: #fff; border: none; padding: 10px 22px; border-radius: 20px; cursor: pointer; }
.back-btn:hover { background: #2563eb; }
</style>