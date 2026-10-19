<script setup>
import { storeToRefs } from 'pinia'
import { useProjectStore } from '../stores/projectStore'

const projectStore = useProjectStore()
const { stats } = storeToRefs(projectStore)
</script>

<template>
  <div class="stats-card">
    <h3>项目统计</h3>
    <div class="stats-grid">
      <div class="stat"><span class="num">{{ stats.total }}</span><span>总项目</span></div>
      <div class="stat done"><span class="num">{{ stats.done }}</span><span>已完成</span></div>
      <div class="stat doing"><span class="num">{{ stats.doing }}</span><span>进行中</span></div>
      <div class="stat todo"><span class="num">{{ stats.todo }}</span><span>计划中</span></div>
    </div>
  </div>
</template>

<style scoped>
.stats-card { background: #fff; border-radius: 14px; padding: 26px 30px; box-shadow: 0 4px 14px rgba(0,0,0,0.06); }
.stats-card h3 { color: #1e293b; margin-bottom: 18px; }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.stat { text-align: center; padding: 16px 8px; border-radius: 10px; background: #f1f5f9; display: flex; flex-direction: column; gap: 6px; }
.stat .num { font-size: 26px; font-weight: 700; color: #3b82f6; }
.stat.done .num  { color: #16a34a; }
.stat.doing .num { color: #d97706; }
.stat.todo .num  { color: #64748b; }
.stat span:last-child { color: #475569; font-size: 13px; }
</style>