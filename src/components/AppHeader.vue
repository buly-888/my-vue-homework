<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import { User, SwitchButton, Setting } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const isLogin = computed(() => userStore.isLogin)

// 菜单激活状态绑定路由
const activeIndex = computed(() => route.path)

function goLogin() { router.push({ name: 'Login' }) }
function goAdmin() { router.push({ name: 'Admin' }) }
function logout() {
  userStore.logout()
  router.replace({ name: 'Home' })
}
</script>

<template>
  <div class="header-wrapper">
    <div class="logo">
      <el-icon :size="24" color="#fff"><User /></el-icon>
      <span>个人空间</span>
    </div>

    <!-- 导航菜单 -->
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      router
      class="el-menu-demo"
      background-color="transparent"
      text-color="#ffffff"
      active-text-color="#ffd04b"
      :ellipsis="false"
    >
      <el-menu-item index="/home">个人主页</el-menu-item>
      <el-menu-item index="/project">项目展示</el-menu-item>
      <el-menu-item index="/article">文章列表</el-menu-item>
      <el-menu-item index="/about">关于我</el-menu-item>
    </el-menu>

    <!-- 登录/后台操作 -->
    <div class="actions">
      <el-button v-if="!isLogin" type="primary" plain round @click="goLogin">登录</el-button>
      <template v-else>
        <el-button type="warning" plain round :icon="Setting" @click="goAdmin">后台管理</el-button>
        <el-button type="danger" plain round :icon="SwitchButton" @click="logout">退出</el-button>
      </template>
    </div>
  </div>
</template>

<style scoped>
.header-wrapper {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  border-radius: 14px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
  height: 64px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
}
.actions {
  display: flex;
  gap: 12px;
}
/* 覆盖 Element 菜单的默认下划线样式 */
:deep(.el-menu--horizontal) {
  border-bottom: none;
}
:deep(.el-menu-item) {
  font-size: 15px;
}
</style>