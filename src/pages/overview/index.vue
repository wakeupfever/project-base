<route lang="yaml">
name: overview
meta:
  layout: default
  hidden: true
</route>

<template>
  <PuiTablePage
    ref="tablePageRef"
    :columns="columns"
    :opt-btns="optBtns"
    :page-shim="{
      pageNo: 'pageIndex',
      pageSize: 'pageSize'
    }"
    :api-params="params"
    @opt-btn-click="optBtnClick"
  >
    <!-- <template #tree>
      <PageTree
        title="部门"
        :tree-props="{ label: 'name' }"
        :tree-api="getTreeApi"
        @on-select="handleTreeSelect"
      />
    </template> -->
    <template #search>
      <div class="mini-title">部门列表</div>
    </template>
    <template #rewardMonth="{ row }">
      {{ dayjs(row.rewardMonth).format('YYYY-MM') }}
    </template>
  </PuiTablePage>

  <ImportDialog ref="importDialogRef" />

  <OperationDialog ref="operationDialogRef" @on-success="refreshTable" />
</template>

<script setup>
import { dayjs } from 'element-plus'
import { optBtns, onColumns } from './resource.js'
import ImportDialog from './components/importDialog.vue'
import OperationDialog from './components/operationDialog.vue'

const importDialogRef = ref(null)
const operationDialogRef = ref(null)
const tablePageRef = ref(null)
const params = ref({
  departmentId: ''
})
// const getTreeApi = computed(() => ({
//   getTreeData: AllDepartment['getDepartmentAll'],
//   saveTreeData: AllDepartment['saveDepartment'],
//   removeTreeData: AllDepartment['delDepartment'],
//   updateTreeData: AllDepartment['updateDepartment']
// }))
const columns = onColumns({})
async function optBtnClick(type, row, index, editing) {
  switch (type) {
    case 'view':
      break
    case 'add':
      operationDialogRef.value.showDialog()
      break
    case 'edit':
      if (!editing) {
        tablePageRef.value['myTableData'][index].editing = true
      }
      break
    case 'del':
      ElMessageBox.confirm('确定删除吗?', '确认', {
        type: 'warning'
      }).then(() => {})
      break
    case 'import':
      break
    case 'download':
      break
    default:
      break
  }
}
// function handleTreeSelect(data) {
//   params.value.departmentId = data.id
// }
function refreshTable() {
  tablePageRef.value.loadData()
}
</script>

<style scoped></style>
