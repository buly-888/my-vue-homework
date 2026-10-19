import { createRouter, createWebHashHistory } from 'vue-router'

import EditProfile from '../views/EditProfile.vue'
import HomePage from '../views/HomePage.vue'
import AboutPage from '../views/AboutPage.vue'
import LoginPage from '../views/LoginPage.vue'
import NotFound from '../views/NotFound.vue'

import ProjectPage from '../views/ProjectPage.vue'
import ProjectList from '../views/ProjectList.vue'
import ProjectDetail from '../views/ProjectDetail.vue'
import ProjectStats from '../views/ProjectStats.vue'

import ArticleList from '../views/ArticleList.vue'
import ArticleDetail from '../views/ArticleDetail.vue'

import AdminPage from '../views/AdminPage.vue'
import AdminProfile from '../views/AdminProfile.vue'
import AdminProject from '../views/AdminProject.vue'
import AdminArticle from '../views/AdminArticle.vue'

import { useUserStore } from '../stores/userStore'

const routes = [
  { path: '/', redirect: '/home' },

  { path: '/home', name: 'Home', component: HomePage, meta: { title: '个人主页' } },

  {
    path: '/project',
    name: 'Project',
    component: ProjectPage,
    redirect: '/project/list',
    meta: { title: '项目中心' },
    children: [
      { path: 'list',  name: 'ProjectList',   component: ProjectList,   meta: { title: '项目列表' } },
      { path: ':id',   name: 'ProjectDetail', component: ProjectDetail, meta: { title: '项目详情' }, props: true },
      { path: 'stats', name: 'ProjectStats',  component: ProjectStats,  meta: { title: '项目统计' } }
    ]
  },

  { path: '/article',     name: 'ArticleList',   component: ArticleList,   meta: { title: '文章列表' } },
  { path: '/article/:id', name: 'ArticleDetail', component: ArticleDetail, meta: { title: '文章详情' }, props: true },

  { path: '/about', name: 'About', component: AboutPage, meta: { title: '关于我' } },
  { path: '/edit-profile', name: 'EditProfile', component: EditProfile, meta: { title: '编辑资料' } },
  { path: '/login', name: 'Login', component: LoginPage, meta: { title: '身份认证' } },

  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
    redirect: '/admin/profile',
    meta: { title: '后台管理', requiresAuth: true },
    children: [
      { path: 'profile', name: 'AdminProfile', component: AdminProfile, meta: { title: '个人简介编辑', requiresAuth: true } },
      { path: 'project', name: 'AdminProject', component: AdminProject, meta: { title: '项目信息编辑', requiresAuth: true } },
      { path: 'article', name: 'AdminArticle', component: AdminArticle, meta: { title: '文章管理',     requiresAuth: true } }
    ]
  },

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound, meta: { title: '页面不存在' } }
]

const router = createRouter({
 history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const baseTitle = '个人空间'
  document.title = to.meta.title ? `${to.meta.title} - ${baseTitle}` : baseTitle

  // ⚠️ 在守卫内部调用 useUserStore，保证 Pinia 已初始化
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.isLogin) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router