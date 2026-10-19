<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const password = ref('')
const errorMsg = ref('')

function login() {
  const ok = userStore.login(username.value, password.value)
  if (ok) {
    const redirect = route.query.redirect
    if (redirect) router.replace(redirect)
    else router.replace({ name: 'Admin' })
  } else {
    errorMsg.value = '用户名或密码错误（演示账号：admin / 123456）'
  }
}
</script>

<template>
  <div class="login-card">
    <h2>身份认证</h2>
    <div class="form-item">
      <label>用户名</label>
      <input v-model="username" placeholder="请输入用户名" />
    </div>
    <div class="form-item">
      <label>密码</label>
      <input v-model="password" type="password" placeholder="请输入密码" />
    </div>
    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    <button class="login-btn" @click="login">登录</button>
    <p class="tip">演示账号：admin / 123456</p>
  </div>
</template>

<style scoped>
.login-card { max-width: 380px; margin: 0 auto; background: #fff; padding: 34px 30px; border-radius: 16px; box-shadow: 0 6px 20px rgba(0,0,0,0.08); }
.login-card h2 { color: #1e293b; text-align: center; margin-bottom: 24px; }
.form-item { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
.form-item label { font-size: 14px; color: #475569; }
.form-item input { padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px; outline: none; }
.form-item input:focus { border-color: #3b82f6; }
.login-btn { width: 100%; background: #3b82f6; color: #fff; border: none; padding: 11px; border-radius: 22px; font-size: 15px; cursor: pointer; margin-top: 6px; }
.login-btn:hover { background: #2563eb; }
.error { color: #ef4444; font-size: 13px; margin-bottom: 8px; }
.tip { color: #94a3b8; font-size: 12px; text-align: center; margin-top: 14px; }
</style>