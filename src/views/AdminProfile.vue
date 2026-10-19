<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useProfileStore } from '../stores/profileStore'

const profileStore = useProfileStore()
const { basicInfo } = storeToRefs(profileStore)

// 编辑副本，避免直接修改 store
const list = ref(basicInfo.value.map(x => ({ ...x })))

function save() {
  profileStore.updateBasicInfo(list.value)
  alert('✅ 基本信息已保存')
}
</script>

<template>
  <div class="admin-card">
    <h3>基本信息编辑</h3>
    <p class="tip">修改后保存，首页"基本信息"大板块会同步更新。</p>

    <div class="form">
      <div v-for="(item, idx) in list" :key="idx" class="row">
        <label>{{ item.label }}</label>
        <input v-model="item.value" />
      </div>
    </div>

    <button class="save-btn" @click="save">保存</button>
  </div>
</template>

<style scoped>
.admin-card { background: #fff; border-radius: 14px; padding: 26px 30px; box-shadow: 0 4px 14px rgba(0,0,0,0.06); }
.admin-card h3 { color: #1e293b; margin-bottom: 8px; }
.tip { color: #94a3b8; font-size: 13px; margin-bottom: 18px; }
.form { display: flex; flex-direction: column; gap: 10px; }
.row { display: flex; align-items: center; gap: 12px; }
.row label { width: 90px; color: #475569; font-size: 14px; flex-shrink: 0; }
.row input { flex: 1; padding: 9px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px; outline: none; }
.row input:focus { border-color: #3b82f6; }
.save-btn { margin-top: 18px; background: #3b82f6; color: #fff; border: none; padding: 9px 22px; border-radius: 20px; cursor: pointer; }
.save-btn:hover { background: #2563eb; }
</style>