<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useProjectStore } from '../stores/projectStore'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const projectStore = useProjectStore()
const { projects } = storeToRefs(projectStore)

const dialogVisible = ref(false)
const isEdit = ref(false)
const form = ref({ id: null, name: '', desc: '', status: '计划中' })

function openAdd() {
  isEdit.value = false
  form.value = { id: null, name: '', desc: '', status: '计划中' }
  dialogVisible.value = true
}

function openEdit(row) {
  isEdit.value = true
  form.value = { ...row }
  dialogVisible.value = true
}

function submit() {
  if (!form.value.name.trim()) {
    ElMessage.warning('项目名称不能为空！')
    return
  }
  if (isEdit.value) {
    projectStore.updateProject(form.value.id, form.value)
    ElMessage.success('项目已更新')
  } else {
    projectStore.addProject({ ...form.value, tags: [], link: '#' })
    ElMessage.success('项目已新增')
  }
  dialogVisible.value = false
}

function handleDelete(id) {
  ElMessageBox.confirm('确定要删除这个项目吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    projectStore.removeProject(id)
    ElMessage.success('删除成功')
  }).catch(() => {})
}
</script>

<template>
  <div>
    <div class="toolbar">
      <el-button type="primary" :icon="Plus" @click="openAdd">新增项目</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="projects" style="width: 100%" border stripe>
      <el-table-column prop="id" label="ID" width="60" align="center" />
      <el-table-column prop="name" label="项目名称" width="180" />
      <el-table-column prop="desc" label="简介" show-overflow-tooltip />
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template #default="scope">
          <el-tag :type="scope.row.status === '已完成' ? 'success' : (scope.row.status === '进行中' ? 'warning' : 'info')">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template #default="scope">
          <el-button size="small" @click="openEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑项目' : '新增项目'" width="500px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="项目名称">
          <el-input v-model="form.name" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="项目简介">
          <el-input v-model="form.desc" type="textarea" :rows="3" placeholder="请输入项目简介" />
        </el-form-item>
        <el-form-item label="项目状态">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="已完成" value="已完成" />
            <el-option label="进行中" value="进行中" />
            <el-option label="计划中" value="计划中" />
          </el-select>
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