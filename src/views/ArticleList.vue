<script setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useArticleStore } from '../stores/articleStore'

const router = useRouter()
const articleStore = useArticleStore()
const { articles } = storeToRefs(articleStore)

function goDetail(id) {
  router.push({ name: 'ArticleDetail', params: { id } })
}
</script>

<template>
  <div class="article-list">
    <h2 class="page-title">文章列表（共 {{ articles.length }} 篇）</h2>

    <div class="article-grid">
      <div v-for="a in articles" :key="a.id" class="article-card" @click="goDetail(a.id)">
        <h3>{{ a.title }}</h3>
        <p class="meta">{{ a.author }} · {{ a.date }}</p>
        <p class="content">{{ a.content }}</p>
        <div class="tags">
          <span v-for="t in a.tags" :key="t" class="tag">{{ t }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.article-list { display: flex; flex-direction: column; gap: 18px; }
.page-title { font-size: 22px; color: #1e293b; padding-left: 10px; border-left: 4px solid #3b82f6; }
.article-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.article-card { background: #fff; padding: 20px 22px; border-radius: 14px; box-shadow: 0 4px 14px rgba(0,0,0,0.06); cursor: pointer; transition: all 0.2s; }
.article-card:hover { transform: translateY(-4px); box-shadow: 0 8px 22px rgba(59,130,246,0.18); }
.article-card h3 { color: #1e293b; font-size: 16px; margin-bottom: 6px; }
.meta { color: #94a3b8; font-size: 12px; margin-bottom: 10px; }
.content { color: #64748b; font-size: 13.5px; line-height: 1.6; margin-bottom: 12px; }
.tags { display: flex; gap: 6px; flex-wrap: wrap; }
.tag { background: #eff6ff; color: #3b82f6; font-size: 12px; padding: 3px 10px; border-radius: 12px; }
</style>