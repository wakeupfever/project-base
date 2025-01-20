<template>
  <div class="import">
    <el-dialog v-model="dialogVisible" title="批量导入" width="30%">
      <PuiForm
        ref="form"
        v-model="formData.data"
        :jsons="formData.formJsons"
        :status="formData.formStatus"
        @submit="onSubmit"
        @reset="onReset"
      >
        <template #upload>
          <el-upload
            class="upload"
            action="/upload"
            :multiple="false"
            :file-list="formData.data.upload"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="onSuccess"
            :on-error="onError"
          >
            <el-button size="small" type="primary" :icon="Upload">选择</el-button>
          </el-upload>
        </template>
      </PuiForm>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Upload } from '@element-plus/icons-vue'
const dialogVisible = ref(false)
const form = ref(null)
const formData = reactive({
  formStatus: 'add',
  data: {},
  formJsons: [
    {
      slotName: 'upload',
      label: '导入',
      span: 12,
      key: 'upload',
      propVal: [{ required: true, message: '上传文件不能为空', trigger: 'change' }]
    }
  ]
})
function onSubmit() {
  console.log('onSubmit')
}

function onReset() {
  console.log('onReset')
  dialogVisible.value = false
}
const showDialog = () => {
  dialogVisible.value = true
}
function beforeUpload(file) {
  console.log('beforeUpload', file)
  return true
}
function onSuccess(res, file) {
  console.log('onSuccess', res, file)
  formData.data.upload = res.data.url
}
function onError(err, file) {
  console.log('onError', err, file)
}

defineExpose({
  showDialog
})
</script>

<style scoped></style>
