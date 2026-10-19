<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticleStore } from '../stores/articleStore'

const route = useRoute()
const router = useRouter()
const articleStore = useArticleStore()

const article = computed(() => articleStore.getArticleById(route.params.id))

function goBack() { router.go(-1) }
</script>

<template>
  <div class="detail-card">
    <template v-if="article">
      <h2>{{ article.title }}</h2>
      <p class="meta">{{ article.author }} · {{ article.date }}</p>
      <p class="content">{{ article.content }}</p>
      <div class="tags">
        <span v-for="t in article.tags" :key="t" class="tag">{{ t }}</span>
      </div>
      <button class="btn" @click="goBack">← 返回</button>
    </template>
    <template v-else>
      <h3 class="error">无效的文章编号</h3>
      <p class="content">未找到 id 为 {{ route.params.id }} 的文章。</p>
      <button class="btn" @click="router.replace({ name: 'ArticleList' })">返回到表</button>
    </template>
  </div>
</template>

<style scoped>
.detail-card { background: #fff; border-radius: 14px; padding: 30px; box-shadow: 0 4px 14px rgba(0,0,0,0.06); }
.detail-card h2 { color: #1e293b; margin-bottom: 8px; }
.error { color: #ef4444; }
.meta { color: #94a3b8; font-size: 13px; margin-bottom: 16px; }
.content { color: #475569; line-height: 1.9; margin-bottom: 14px; }
.tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 20px; }
.tag { background: #eff6ff; color: #3b82f6; font-size: 12px; padding: 3px 10px; border-radius: 12px; }
.btn { background: #3b82f6; color: #fff; border: none; padding: 9px 22px; border-radius: 20px; cursor: pointer; }
.btn:hover { background: #2563eb; }
</style>