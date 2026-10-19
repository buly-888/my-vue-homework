import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { DEFAULT_PROJECTS } from '../data/projectsData'

export const useProjectStore = defineStore('project', () => {
  const projects = ref(
    JSON.parse(localStorage.getItem('projects') || 'null') || DEFAULT_PROJECTS
  )

  const stats = computed(() => ({
    total: projects.value.length,
    done:  projects.value.filter(p => p.status === '已完成').length,
    doing: projects.value.filter(p => p.status === '进行中').length,
    todo:  projects.value.filter(p => p.status === '计划中').length
  }))

  function persist() {
    localStorage.setItem('projects', JSON.stringify(projects.value))
  }

  function addProject(project) {
    const newId = Math.max(0, ...projects.value.map(p => p.id)) + 1
    projects.value.push({ ...project, id: newId })
    persist()
  }

  function updateProject(id, data) {
    const idx = projects.value.findIndex(p => p.id === id)
    if (idx !== -1) {
      projects.value[idx] = { ...projects.value[idx], ...data }
      persist()
    }
  }

  function removeProject(id) {
    projects.value = projects.value.filter(p => p.id !== id)
    persist()
  }

  function getProjectById(id) {
    return projects.value.find(p => p.id === Number(id))
  }

  return { projects, stats, addProject, updateProject, removeProject, getProjectById }
})