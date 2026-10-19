<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import ProjectSection from '../components/project/ProjectSection.vue'
import ProjectCard from '../components/project/ProjectCard.vue'
import { useProjectStore } from '../stores/projectStore'

const router = useRouter()
const projectStore = useProjectStore()
// storeToRefs 保持响应式
const { projects } = storeToRefs(projectStore)

function goDetail(project) {
  router.push({ name: 'ProjectDetail', params: { id: project.id } })
}
</script>

<template>
  <ProjectSection :projects="projects">
    <template #default="{ project, index }">
      <ProjectCard :project="project" :index="index">
        <template #status>
          <span
            class="status-tag"
            :class="{
              done:  project.status === '已完成',
              doing: project.status === '进行中',
              todo:  project.status === '计划中'
            }"
          >{{ project.status }}</span>
        </template>
        <template #actions>
          <button class="link-btn" @click="goDetail(project)">查看详情 →</button>
        </template>
      </ProjectCard>
    </template>
  </ProjectSection>
</template>

<style scoped>
.status-tag { display: inline-block; padding: 3px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; }
.status-tag.done  { background: #dcfce7; color: #166534; }
.status-tag.doing { background: #fef3c7; color: #92400e; }
.status-tag.todo  { background: #e2e8f0; color: #475569; }
.link-btn { color: #3b82f6; font-size: 14px; font-weight: 500; background: none; border: none; cursor: pointer; }
.link-btn:hover { text-decoration: underline; }
</style>