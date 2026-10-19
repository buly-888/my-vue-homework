<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProfileStore } from '../stores/profileStore'

const router = useRouter()
const profileStore = useProfileStore()

const form = ref({ ...profileStore.header })

function save() {
  if (!form.value.name.trim()) {
    alert('姓名不能为空！')
    return
  }
  profileStore.updateHeader({ ...form.value })
  alert('✅ 资料已保存')
  router.replace({ name: 'Home' })
}

function cancel() {
  router.go(-1)
}
</script>

<template>
  <div class="edit-card">
    <h2>编辑资料</h2>

    <div class="form-item">
      <label>头像链接</label>
      <input v-model="form.avatar" />
    </div>
    <div class="form-item">
      <label>姓名</label>
      <input v-model="form.name" />
    </div>
    <div class="form-item">
      <label>学校 / 专业 / 学历</label>
      <input v-model="form.subtitle" placeholder="如：重庆工程学院 · 计算机科学与技术 · 本科" />
    </div>
    <div class="form-item">
      <label>个人简介</label>
      <textarea v-model="form.bio" rows="4"></textarea>
    </div>

    <div class="btns">
      <button class="save-btn" @click="save">保存</button>
      <button class="cancel-btn" @click="cancel">取消</button>
    </div>
  </div>
</template>

<style scoped>
.edit-card { background: #fff; border-radius: 16px; padding: 30px 34px; box-shadow: 0 6px 20px rgba(0,0,0,0.08); }
.edit-card h2 { color: #1e293b; margin-bottom: 22px; padding-left: 10px; border-left: 4px solid #3b82f6; }
.form-item { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
.form-item label { font-size: 14px; color: #475569; }
.form-item input, .form-item textarea {
  padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px;
  font-family: inherit; font-size: 14px; outline: none; resize: vertical;
}
.form-item input:focus, .form-item textarea:focus { border-color: #3b82f6; }
.btns { display: flex; gap: 10px; margin-top: 18px; }
.save-btn { background: #3b82f6; color: #fff; border: none; padding: 10px 24px; border-radius: 20px; cursor: pointer; }
.save-btn:hover { background: #2563eb; }
.cancel-btn { background: #e2e8f0; color: #475569; border: none; padding: 10px 24px; border-radius: 20px; cursor: pointer; }
</style>