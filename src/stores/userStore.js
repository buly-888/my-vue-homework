import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // state
  const isLogin = ref(localStorage.getItem('isLogin') === '1')

  // getters
  const isAdmin = computed(() => isLogin.value)

  // actions
  function login(username, password) {
    if (username === 'admin' && password === '123456') {
      isLogin.value = true
      localStorage.setItem('isLogin', '1')
      return true
    }
    return false
  }

  function logout() {
    isLogin.value = false
    localStorage.removeItem('isLogin')
  }

  return { isLogin, isAdmin, login, logout }
})