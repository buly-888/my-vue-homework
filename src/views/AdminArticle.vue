<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useArticleStore } from '../stores/articleStore'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const articleStore = useArticleStore()
const { articles } = storeToRefs(articleStore)

const dialogVisible = ref(false)
const isEdit = ref(false)
const form = ref({ id: null, title: '', content: '', author: '朱峻贤', tags: '' })

function openAdd() {
  isEdit.value = false
  form.value = { id: null, title: '', content: '', author: '朱峻贤', tags: '' }
  dialogVisible.value = true
}

function openEdit(row) {
  isEdit.value = true
  form.value = { ...row, tags: row.tags.join(',') }
  dialogVisible.value = true
}

function submit() {
  if (!form.value.title.trim()) {
    ElMessage.warning('标题不能为空！')
    return
  }
  const data = {
    title: form.value.title,
    content: form.value.content,
    author: form.value.author,
    date: new Date().toISOString().slice(0, 10),
    tags: form.value.tags.split(/[,，\s]+/).filter(Boolean)
  }
  
  if (isEdit.value) {
    articleStore.updateArticle(form.value.id, data)
    ElMessage.success('文章已更新')
  } else {
    articleStore.addArticle(data)
    ElMessage.success('文章已新增')
  }
  dialogVisible.value = false
}

function handleDelete(id) {
  ElMessageBox.confirm('确定要删除这篇文章吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    articleStore.removeArticle(id)
    ElMessage.success('删除成功')
  }).catch(() => {})
}
</script>

<template>
  <div>
    <div class="toolbar">
      <el-button type="primary" :icon="Plus" @click="openAdd">新增文章</el-button>
    </div>

    <el-table :data="articles" style="width: 100%" border stripe>
      <el-table-column prop="id" label="ID" width="60" align="center" />
      <el-table-column prop="title" label="标题" width="200" />
      <el-table-column prop="author" label="作者" width="100" align="center" />
      <el-table-column prop="date" label="发布日期" width="120" align="center" />
      <el-table-column label="操作" width="150" align="center">
        <template #default="scope">
          <el-button size="small" @click="openEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑文章' : '新增文章'" width="600px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="文章标题">
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="文章内容">
          <el-input v-model="form.content" type="textarea" :rows="4" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.author" />
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="form.tags" placeholder="如：Vue3, 学习" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.toolbar {
  margin-bottom: 16px;
}
</style>