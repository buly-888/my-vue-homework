<script setup>
import { computed } from 'vue'

// defineModel：搜索词双向绑定（父组件用 v-model:keyword 使用）
const keyword = defineModel('keyword', { type: String, default: '' })

const props = defineProps({
  skills:       { type: Array, default: () => [] },
  showSearch:   { type: Boolean, default: true }
})

// 根据搜索词过滤
const filtered = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  if (!kw) return props.skills
  return props.skills.filter(s => s.toLowerCase().includes(kw))
})
</script>

<template>
  <div class="skill-list">
    <div v-if="showSearch" class="search-row">
      <input
        v-model="keyword"
        type="text"
        class="search-input"
        placeholder="输入关键词搜索技能..."
      />
    </div>

    <div v-if="filtered.length > 0" class="tags">
      <span v-for="s in filtered" :key="s" class="tag skill">{{ s }}</span>
    </div>
    <p v-else class="empty">没有匹配的技能 😢</p>
  </div>
</template>

<style scoped>
.skill-list { display: flex; flex-direction: column; gap: 12px; }
.search-row { display: flex; justify-content: flex-end; }
.search-input {
  padding: 8px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
  width: 220px;
  transition: border-color 0.2s;
}
.search-input:focus { border-color: #3b82f6; }
.tags { display: flex; flex-wrap: wrap; gap: 8px; }
.tag { padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 500; }
.tag.skill { background: #dbeafe; color: #1e40af; }
.empty { color: #94a3b8; font-style: italic; padding: 10px 0; }
</style>