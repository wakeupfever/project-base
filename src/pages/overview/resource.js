import { CirclePlusFilled, Download, Upload } from '@element-plus/icons-vue'
/* 操作按钮 */
export const optBtns = [
  { opt: 'add', name: '新增', type: 'primary', icon: CirclePlusFilled },
  {
    opt: 'import',
    name: '批量导入',
    type: 'primary',
    icon: Upload,
    plain: true
  },
  { opt: 'download', name: '下载导入模板', type: 'primary', icon: Download, plain: true }
]
export const onColumns = event => [
  { type: 'index', label: '序号', width: 60 },
  { label: '姓名', prop: 'staffName' },
  { label: '部门', prop: 'departmentName' },
  { label: '奖金', prop: 'bonus', editCfg: 'input' },
  {
    label: '评审月份',
    prop: 'rewardMonth',
    slotName: 'rewardMonth',
    editCfg: { ele: 'date', type: 'month', placeholder: '请选择月份' }
  },
  {
    label: '操作',
    render: (h, row, $index, prop, tableData) => {
      console.log(prop, tableData)
      // const myPopover = resolveDirective('popover')
      // const popover = event.refPopover
      return [
        h(
          'span',
          {
            class: 'ml-2 text-[#3954FF] text-[14px] cursor-pointer hover:opacity-80',
            onClick: e => {
              e.stopPropagation()
              if (row.editing) {
                event.handleEdit(row, $index)
              } else {
                event.optBtnClick('edit', row, $index)
              }
            }
          },
          row.editing ? '保存' : '编辑'
        ),
        h(
          'span',
          {
            class: 'ml-2 text-[#FF5C6D] text-[14px] cursor-pointer hover:opacity-80',
            onClick: e => {
              e.stopPropagation()
              event.optBtnClick('del', row, $index)
            }
          },
          '删除'
        )
      ]
    },
    width: 100
  }
]
