<template>
  <div class="layout bg-[#fff] flex flex-col w-full h-full p-[20px] bg-center">
    <DefaultNav class="mb-[20px]" />

    <div class="layout-content flex h-0 flex-1">
      <!-- <div class="default-left-layout w-[280px] pr-[10px] rounded-[10px] flex-[0_0_280px]"> -->
      <DefaultLeft
        class="default-left-layout pr-[10px] rounded-[10px] w-[280px] flex-[0_0_280px]"
      />
      <!-- </div> -->
      <div
        class="default-right-layout flex-1 rounded-[10px] overflow-hidden bg-[#fff]"
        :class="{ 'no-bg': route.meta.hideBg }"
      >
        <RouterView v-slot="{ Component }">
          <Transition>
            <component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>

<script setup>
import DefaultLeft from '@/layouts/components/DefaultLeft.vue'
import DefaultNav from '@/layouts/components/DefaultNav.vue'

const route = useRoute()
</script>

<style scoped>
.layout {
  background: url('@/assets/images/layout-bg.png') center center no-repeat;
  background-size: 100% 100%;

  .default-right-layout {
    box-shadow: 0px 2px 20px 0px rgba(82, 82, 82, 0.2);
    &.no-bg {
      box-shadow: none;
      background-color: transparent;
    }
  }
}
</style>
