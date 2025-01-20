<template>
  <div class="add-dialog">
    <el-dialog
      v-model="dialogVisible"
      :title="formData.title"
      width="20%"
      :before-close="handleClose"
      :destroy-on-close="true"
    >
      <!-- {{ formData.data }} -->
      <PuiForm
        v-model="formData.data"
        :jsons="formData.formJsons"
        :status="formData.formStatus"
        label-width="80px"
        @submit="onSubmit"
        @reset="onReset"
      >
        <template #staffId>
          <el-select
            v-model="formData.data.staffId"
            placeholder="请选择员工"
            @change="onSelectStaff"
          >
            <el-option
              v-for="item in staffList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </template>
      </PuiForm>
    </el-dialog>
  </div>
</template>

<script setup>
// import { addStaffExcellent } from '@/api/staffExcellent'
// import { getAllStaff } from '@/api/staffManagement'
// const emits = defineEmits('on-success')
const dialogVisible = ref(false)
const formData = reactive({
  formStatus: 'add',
  title: '新增信息',
  data: {
    staffId: '',
    staffName: '',
    departmentId: '',
    bonus: '',
    rewardMonth: ''
  },
  formJsons: [
    {
      key: 'staffId',
      slotName: 'staffId',
      label: '员工',
      propVal: [{ required: true, message: '员工名称不能为空', trigger: 'blur' }],
      span: 24
    },
    {
      ele: 'Input',
      key: 'bonus',
      label: '奖金',
      type: 'number',
      placeholder: '请输入奖金',
      propVal: [{ required: true, message: '奖金不能为空', trigger: 'blur' }],
      span: 24
    },
    {
      ele: 'DatePicker',
      key: 'rewardMonth',
      label: '评审月份',
      placeholder: '选择评审月份',
      span: 24,
      type: 'month' /** ElDatePicker的 type属性 */,
      propVal: [{ required: true, message: '评审月份不能为空', trigger: 'change' }],
      'value-format': 'YYYY-MM-01 00:00:00'
    }
  ]
})
const staffList = ref([])
function handleClose() {
  dialogVisible.value = false
}
function onSubmit() {
  // formData.data.staffId = ''
  // addStaffExcellent(formData.data).then(res => {
  //   if (res.success) {
  //     ElMessage.success('操作成功!')
  //     emits('on-success')
  //     dialogVisible.value = false
  //   }
  // })
}
function onReset() {
  dialogVisible.value = false
}
const showDialog = () => {
  formData.formStatus = 'add'
  formData.title = '新增信息'
  dialogVisible.value = true
}
const onSelectStaff = val => {
  console.log(val, 'onSelectStaff')
}
onMounted(() => {
  // getAllStaff({}).then(res => {
  //   if (res.success) {
  //     staffList.value = res.data
  //   }
  // })
})
watch(
  () => formData.data.staffId,
  () => {
    const res = staffList.value.find(item => item.id === formData.data.staffId)
    if (res) {
      formData.data.staffName = res.name
      formData.data.departmentId = res.departmentId
    } else {
      formData.data.staffName = ''
      formData.data.departmentId = ''
    }
  }
)
defineExpose({
  showDialog
})
</script>

<style scoped></style>
