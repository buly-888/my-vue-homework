<script setup>
defineProps({
  projects: { type: Array, default: () => [] },
  layout:   { type: String, default: 'grid' }  // 'grid' | 'list'
})
</script>

<template>
  <div class="project-section">
    <div v-if="projects.length === 0" class="empty">暂无项目</div>
    <div v-else :class="layout === 'list' ? 'project-list' : 'project-grid'">
      <slot
        v-for="(project, index) in projects"
        :key="project.id"
        :project="project"
        :index="index"
      ></slot>
    </div>
  </div>
</template>

<style scoped>
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
.project-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.empty { color: #94a3b8; text-align: center; padding: 30px 0; }
</style>