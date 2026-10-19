<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProfileStore } from '../stores/profileStore'
import { internships, schoolExperiences, skills, certificates, selfEvaluation } from '../data/profileData'
import { DEFAULT_PROJECTS } from '../data/projectsData'

const router = useRouter()
const profileStore = useProfileStore()
const { header, basicInfo } = storeToRefs(profileStore)

const keyword = ref('')
const projects = ref(DEFAULT_PROJECTS)
const activeNames = ref(['1']) // 控制折叠面板

function goDetail(project) {
  router.push({ name: 'ProjectDetail', params: { id: project.id } })
}
function goEdit() {
  router.push({ name: 'EditProfile' })
}

// 技能搜索过滤
const filteredSkills = () => {
  const kw = keyword.value.trim().toLowerCase()
  if (!kw) return skills
  return skills.filter(s => s.toLowerCase().includes(kw))
}
</script>

<template>
  <div class="home-page">
    <!-- 1. 顶部卡片 -->
    <el-card class="header-card" shadow="hover">
      <div class="header-content">
        <el-avatar :size="90" :src="header.avatar" class="avatar" />
        <div class="info">
          <h1>{{ header.name }}</h1>
          <p class="subtitle">{{ header.subtitle }}</p>
          <p class="bio">{{ header.bio }}</p>
        </div>
        <el-button type="primary" plain round @click="goEdit">✎ 编辑资料</el-button>
      </div>
    </el-card>

    <!-- 2. 基本信息（折叠面板） -->
    <el-card shadow="never">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基本信息" name="1">
          <el-row :gutter="20">
            <el-col :span="8" v-for="item in basicInfo" :key="item.label">
              <div class="info-item">
                <span class="label">{{ item.label }}：</span>
                <span class="value">{{ item.value }}</span>
              </div>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-card>

    <el-row :gutter="20">
      <!-- 3. 实习经历 & 在校经历（时间线） -->
      <el-col :span="12">
        <el-card shadow="never" class="block-card">
          <template #header><div class="card-header">实习经历</div></template>
          <el-timeline>
            <el-timeline-item
              v-for="(item, idx) in internships" :key="idx"
              :timestamp="item.period" placement="top" color="#3b82f6"
            >
              <h4>{{ item.company }}</h4>
              <p class="pos">{{ item.position }}</p>
              <p class="desc">{{ item.desc }}</p>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card shadow="never" class="block-card">
          <template #header><div class="card-header">在校经历</div></template>
          <el-timeline>
            <el-timeline-item
              v-for="(item, idx) in schoolExperiences" :key="idx"
              :timestamp="item.period" placement="top" color="#10b981"
            >
              <h4>{{ item.title }}</h4>
              <p class="desc">{{ item.desc }}</p>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>

    <!-- 4. 技能证书（输入框 + 标签） -->
    <el-card shadow="never">
      <template #header>
        <div class="card-header-flex">
          <span class="card-header">技能证书</span>
          <el-input v-model="keyword" placeholder="搜索技能..." prefix-icon="Search" style="width: 200px" clearable />
        </div>
      </template>
      <el-divider content-position="left">专业技能</el-divider>
      <div class="tags">
        <el-tag v-for="s in filteredSkills()" :key="s" type="primary" effect="light" size="large">{{ s }}</el-tag>
      </div>
      <el-divider content-position="left">证书</el-divider>
      <div class="tags">
        <el-tag v-for="c in certificates" :key="c" type="success" effect="light" size="large">{{ c }}</el-tag>
      </div>
    </el-card>

    <!-- 5. 项目展示（一行一个） -->
    <el-card shadow="never">
      <template #header>
        <div class="card-header-flex">
          <span class="card-header">项目展示</span>
          <el-button link type="primary" @click="router.push({ name: 'Project' })">查看项目中心 →</el-button>
        </div>
      </template>
      
      <div class="project-list">
        <el-card v-for="(p, idx) in projects" :key="p.id" shadow="hover" class="project-item">
          <div class="project-content">
            <div class="project-main">
              <h3><span class="idx">#{{ idx + 1 }}</span> {{ p.name }}</h3>
              <p class="desc">{{ p.desc }}</p>
              <div class="tags" style="margin-top: 8px;">
                <el-tag size="small" v-for="t in p.tags" :key="t" style="margin-right: 6px;">{{ t }}</el-tag>
              </div>
            </div>
            <div class="project-action">
              <el-tag :type="p.status === '已完成' ? 'success' : (p.status === '进行中' ? 'warning' : 'info')" effect="dark" round>
                {{ p.status }}
              </el-tag>
              <el-button type="primary" size="small" @click="goDetail(p)" style="margin-left: 12px;">查看详情</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </el-card>

    <!-- 6. 自我评价 -->
    <el-card shadow="never">
      <template #header><div class="card-header">自我评价</div></template>
      <p class="eval-text">{{ selfEvaluation }}</p>
    </el-card>
  </div>
</template>

<style scoped>
.home-page { display: flex; flex-direction: column; gap: 20px; }

.header-card { border-radius: 14px; }
.header-content { display: flex; align-items: center; gap: 20px; }
.avatar { border: 3px solid #3b82f6; flex-shrink: 0; }
.info { flex: 1; }
.info h1 { font-size: 24px; color: #1e293b; margin-bottom: 6px; }
.subtitle { color: #3b82f6; font-size: 14px; font-weight: 500; margin-bottom: 6px; }
.bio { color: #64748b; font-size: 13px; }

.info-item { font-size: 14px; color: #475569; margin-bottom: 10px; }
.info-item .label { color: #94a3b8; }
.info-item .value { font-weight: 500; color: #1e293b; }

.card-header { font-size: 16px; font-weight: 600; color: #1e293b; }
.card-header-flex { display: flex; justify-content: space-between; align-items: center; }

.block-card { height: 100%; }
.pos { color: #3b82f6; font-size: 13px; margin: 4px 0; }
.desc { color: #64748b; font-size: 13px; line-height: 1.6; }

.tags { display: flex; flex-wrap: wrap; gap: 10px; }

.project-item { margin-bottom: 12px; border-radius: 10px; }
.project-content { display: flex; justify-content: space-between; align-items: center; }
.project-main { flex: 1; }
.project-main h3 { color: #1e293b; font-size: 16px; margin-bottom: 6px; }
.idx { color: #94a3b8; font-size: 13px; margin-right: 6px; }
.project-action { display: flex; align-items: center; }

.eval-text { color: #475569; line-height: 1.8; font-size: 14px; }
</style>