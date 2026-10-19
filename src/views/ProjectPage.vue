<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="project-layout">
    <h2 class="page-title">项目中心</h2>

    <div class="sub-nav">
      <RouterLink :to="{ name: 'ProjectList' }"  class="sub-link">项目列表</RouterLink>
      <RouterLink :to="{ name: 'ProjectStats' }" class="sub-link">项目统计</RouterLink>
    </div>

    <RouterView />
  </div>
</template>

<style scoped>
.project-layout { display: flex; flex-direction: column; gap: 16px; }
.page-title { font-size: 22px; color: #1e293b; padding-left: 10px; border-left: 4px solid #3b82f6; }
.sub-nav { display: flex; gap: 10px; }
.sub-link { text-decoration: none; color: #475569; background: #f1f5f9; padding: 7px 18px; border-radius: 20px; font-size: 14px; transition: all 0.2s; }
.sub-link:hover { background: #e2e8f0; }
.sub-link.router-link-active { background: #3b82f6; color: #fff; }
</style>