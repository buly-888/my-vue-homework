import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' // 引入 Element Plus 样式
import zhCn from 'element-plus/es/locale/lang/zh-cn' // 中文语言包
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // 图标

import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

// 全局注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)
app.use(ElementPlus, { locale: zhCn }) // 使用中文
app.mount('#app')