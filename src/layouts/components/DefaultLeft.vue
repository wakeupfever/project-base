<template>
  <div
    class="default-menu flex flex-col justify-between h-full w-[280px] flex-[0_0_280px]"
    :class="{ 'w-[70px] flex-[0_0_70px]': isCollapse }"
  >
    <ElScrollbar class="default-menu-left flex-1 flex w-full h-0" wrap-class="w-full">
      <DefaultMenu
        v-model:collapse="isCollapse"
        class="w-full"
        :class="{ 'pr-[20px]': !isCollapse }"
      />
    </ElScrollbar>
    <!-- 侧边栏 -->
    <div
      class="default-menu-right flex items-center justify-between py-[8px] px-[20px] pl-[16px] bg-[#2235BF] rounded-[8px] flex-[0_0_60px]"
      :class="{ 'mr-[20px]': !isCollapse }"
    >
      <div class="icon-left flex items-center">
        <ElIcon size="30" @click="isCollapse = !isCollapse">
          <IconMenuCo
            class="mr-[10px] cursor-pointer collapse-icon"
            :class="{ 'rotate-180': isCollapse }"
          />
        </ElIcon>
      </div>
      <div
        v-show="!isCollapse"
        class="info-exit text-[18px] cursor-pointer text-[#fff] leading-[20px]"
        @click="isCollapse = !isCollapse"
      >
        收起
      </div>
    </div>
  </div>
</template>

<script setup>
import DefaultMenu from '@/layouts/components/DefaultMenu.vue'

const isCollapse = ref(false)
</script>

<style scoped>
.default-menu {
  transition: all 0.3s ease-in-out;
}
.default-menu-right {
  transition: all 0.3s ease-in-out;
}
.collapse-icon {
  transition: all 0.3s ease-in-out;
}
</style>
