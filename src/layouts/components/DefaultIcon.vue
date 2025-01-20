<template>
  <ElIcon size="24">
    <IconMenuPollutantManagement v-if="name === 'pollutant-management'" />
    <IconMenuEnvironmentalQuality v-if="name === 'environmental-quality'" />
    <IconMenuDeviceManagement v-if="name === 'device-management'" />
    <IconMenuSettings v-if="name === 'settings'" />
    <IconMenuDisposalCenter v-if="name === 'disposal-center'" />
    <IconMenuAlarmWarningCenter v-if="name === 'alarm-warning-center'" />
  </ElIcon>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
})

// 提取名字
const name = computed(() => props.item?.path?.split?.('/')?.[1])

// 连字符转换成小驼峰
// const iconName = computed(() => {
//   const l = name.value.split('-')

//   const text = l.reduce((acc, cur, index) => {
//     if (index === 0) {
//       acc += cur
//     } else {
//       cur = cur.charAt(0).toUpperCase() + cur.slice(1)
//       acc += cur
//     }
//     return acc
//   }, '')

//   return text
// })
</script>
