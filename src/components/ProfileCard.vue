<script setup>
defineProps({
  avatar:   { type: String, default: '' },
  name:     { type: String, required: true },
  subtitle: { type: String, default: '' },
  bio:      { type: String, default: '' }
})

const emit = defineEmits(['edit'])
</script>

<template>
  <section class="profile-card">
    <img :src="avatar" class="avatar" alt="头像" />
    <div class="info">
      <h1>{{ name }}</h1>
      <p class="subtitle">{{ subtitle }}</p>
      <p class="bio">{{ bio }}</p>
    </div>
    <button class="edit-btn" @click="emit('edit')">✎ 编辑资料</button>
  </section>
</template>

<style scoped>
.profile-card {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #fff;
  border-radius: 16px;
  padding: 30px 34px;
  display: flex;
  align-items: center;
  gap: 24px;
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.25);
  position: relative;
}
.avatar {
  width: 100px; height: 100px;
  border-radius: 50%;
  border: 3px solid #fff;
  background: #f0f0f0;
  object-fit: cover;
  flex-shrink: 0;
}
.info { flex: 1; }
.info h1 { font-size: 26px; margin-bottom: 6px; }
.subtitle { font-size: 14px; opacity: 0.9; margin-bottom: 8px; }
.bio { font-size: 14px; line-height: 1.7; opacity: 0.85; }
.edit-btn {
  position: absolute;
  top: 20px; right: 24px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}
.edit-btn:hover { background: #fff; color: #2563eb; }
</style>