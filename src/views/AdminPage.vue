<script setup>
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { Document, User, Files } from '@element-plus/icons-vue'

const route = useRoute()
</script>

<template>
  <el-container class="admin-container">
    <!-- 侧边栏 -->
    <el-aside width="200px" class="admin-aside">
      <div class="admin-title">后台管理</div>
      <el-menu
        :default-active="route.path"
        router
        class="admin-menu"
      >
        <el-menu-item index="/admin/profile">
          <el-icon><User /></el-icon>
          <span>个人简介编辑</span>
        </el-menu-item>
        <el-menu-item index="/admin/project">
          <el-icon><Document /></el-icon>
          <span>项目信息编辑</span>
        </el-menu-item>
        <el-menu-item index="/admin/article">
          <el-icon><Files /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 右侧内容区 -->
    <el-main class="admin-main">
      <RouterView />
    </el-main>
  </el-container>
</template>

<style scoped>
.admin-container {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.06);
  min-height: 500px;
  overflow: hidden;
}
.admin-aside {
  background: #f8fafc;
  border-right: 1px solid #e2e8f0;
}
.admin-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #e2e8f0;
}
.admin-menu {
  border-right: none;
  background: transparent;
}
.admin-main {
  padding: 24px;
}
</style>