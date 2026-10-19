<script setup>
defineProps({
  project: { type: Object, required: true },
  index:   { type: Number, default: 0 }
})
</script>

<template>
  <div class="project-card">
    <div class="card-top">
      <span class="index">#{{ index + 1 }}</span>
      <slot name="status"></slot>
    </div>

    <!-- 默认插槽：主体内容（未传则显示默认） -->
    <div class="card-body">
      <slot>
        <h3>{{ project.name }}</h3>
        <p>{{ project.desc }}</p>
      </slot>
    </div>

    <div class="tags">
      <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>

    <div class="card-bottom">
      <slot name="actions">
        <span class="default-action">默认操作</span>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.project-card {
  background: #fff;
  border-radius: 14px;
  padding: 18px 20px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 22px rgba(59, 130, 246, 0.18);
}
.card-top { display: flex; justify-content: space-between; align-items: center; }
.index { color: #94a3b8; font-size: 13px; font-weight: 600; }
.card-body h3 { color: #1e293b; font-size: 17px; margin-bottom: 6px; }
.card-body p { color: #64748b; font-size: 13.5px; line-height: 1.6; }
.tags { display: flex; flex-wrap: wrap; gap: 6px; }
.tag { background: #eff6ff; color: #3b82f6; font-size: 12px; padding: 3px 10px; border-radius: 12px; }
.card-bottom {
  display: flex;
  justify-content: flex-end;
  border-top: 1px dashed #e2e8f0;
  padding-top: 10px;
  margin-top: 4px;
}
.default-action { color: #94a3b8; font-size: 13px; }
</style>