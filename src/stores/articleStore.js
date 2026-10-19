import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { DEFAULT_ARTICLES } from '../data/articlesData'

export const useArticleStore = defineStore('article', () => {
  const articles = ref(
    JSON.parse(localStorage.getItem('articles') || 'null') || DEFAULT_ARTICLES
  )

  const count = computed(() => articles.value.length)

  function persist() {
    localStorage.setItem('articles', JSON.stringify(articles.value))
  }

  function addArticle(article) {
    const newId = Math.max(0, ...articles.value.map(a => a.id)) + 1
    articles.value.push({ ...article, id: newId })
    persist()
  }

  function updateArticle(id, data) {
    const idx = articles.value.findIndex(a => a.id === id)
    if (idx !== -1) {
      articles.value[idx] = { ...articles.value[idx], ...data }
      persist()
    }
  }

  function removeArticle(id) {
    articles.value = articles.value.filter(a => a.id !== id)
    persist()
  }

  function getArticleById(id) {
    return articles.value.find(a => a.id === Number(id))
  }

  return { articles, count, addArticle, updateArticle, removeArticle, getArticleById }
})