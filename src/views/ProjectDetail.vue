<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectStore } from '../stores/projectStore'

const route = useRoute()
const router = useRouter()
const projectStore = useProjectStore()

const project = computed(() => projectStore.getProjectById(route.params.id))

function backToList() { router.replace({ name: 'ProjectList' }) }
function goBack()     { router.go(-1) }
</script>

<template>
  <div class="detail-card">
    <template v-if="project">
      <h3>{{ project.name }}</h3>
      <p class="desc">{{ project.desc }}</p>
      <div class="tags">
        <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
      <p class="status">状态：<strong>{{ project.status }}</strong></p>

      <div class="btns">
        <button class="btn" @click="goBack">← 返回上一页</button>
        <button class="btn primary" @click="backToList">返回到表</button>
      </div>
    </template>

    <template v-else>
      <h3 class="error">无效的项目编号</h3>
      <p class="desc">未找到 id 为 {{ route.params.id }} 的项目。</p>
      <button class="btn primary" @click="backToList">返回到表</button>
    </template>
  </div>
</template>

<style scoped>
.detail-card { background: #fff; border-radius: 14px; padding: 26px 30px; box-shadow: 0 4px 14px rgba(0,0,0,0.06); }
.detail-card h3 { color: #1e293b; margin-bottom: 12px; }
.error { color: #ef4444; }
.desc { color: #475569; line-height: 1.8; margin-bottom: 14px; }
.tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
.tag { background: #eff6ff; color: #3b82f6; font-size: 12px; padding: 3px 12px; border-radius: 12px; }
.status { color: #475569; margin-bottom: 20px; }
.btns { display: flex; gap: 10px; }
.btn { background: #e2e8f0; color: #475569; border: none; padding: 9px 20px; border-radius: 20px; cursor: pointer; }
.btn:hover { background: #cbd5e1; }
.btn.primary { background: #3b82f6; color: #fff; }
.btn.primary:hover { background: #2563eb; }
</style>