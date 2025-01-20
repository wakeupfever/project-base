<template>
  <ElMenu
    :default-active="route.path"
    background-color="#F3F3F8"
    text-color="#8D9BCE"
    active-text-color="#fff"
    class="cover-menu w-full h-full"
    popper-class="cover-menu-popper"
    :collapse="isCollapse"
    router
  >
    <template v-for="(item, index) in menuData" :key="index">
      <ElSubMenu v-if="item.children.length" :index="item.path">
        <template #title>
          <DefaultIcon :item="item" />
          <span>{{ item.name || item.meta.name }}</span>
        </template>
        <template v-if="item.children">
          <ElMenuItem
            v-for="(itemChild, indexChild) in item.children"
            :key="indexChild"
            :index="itemChild.path"
          >
            <ElIcon>
              <!-- <IconMdiAccountCard /> -->
              <span
                class="plot flex w-[7px] h-[7px] bg-[#154480]/[0.7] rounded-[2px] rotate-[45deg]"
              />
            </ElIcon>
            <span>{{ itemChild.name || itemChild.meta.name }}</span>
          </ElMenuItem>
        </template>
      </ElSubMenu>
      <ElMenuItem v-else :index="item.path">
        <DefaultIcon :item="item" />
        <span>{{ item.name || item.meta.name }}</span>
      </ElMenuItem>
    </template>
  </ElMenu>
</template>

<script setup>
import routes from '~pages'
import { createHierarchicalRoutes } from '@/layouts/routeControl.js'
import DefaultIcon from '@/layouts/components/DefaultIcon.vue'

const route = useRoute()

const isCollapse = defineModel('collapse', {
  type: Boolean,
  default: false
})

const routeDefaultMenu = routes.filter(
  item => (item?.meta?.layout === 'default' || !item?.meta?.layout) && item?.meta?.hidden !== true
)

// console.log(routeDefaultMenu, 'routeDefaultMenu')

// const d = createHierarchicalRoutes(routeDefaultMenu)

const menuData = computed(() => {
  const d = createHierarchicalRoutes(routeDefaultMenu)
  return d
})
</script>

<style>
.cover-menu-popper {
  border-radius: 10px;
  overflow: hidden;
  .el-menu {
    background-color: var(--theme-bg-color);
    padding: 5px 10px;
    .el-menu-item {
      --el-menu-hover-bg-color: #ecf5ff;
      color: white;
      padding: 0 15px;
      border-radius: 10px;
      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
      &.is-active {
        background-color: white;
        color: var(--theme-color);
        .plot {
          background-color: var(--theme-color);
        }
      }
      .plot {
        background-color: white;
      }
    }
  }
}
</style>
<style scoped lang="less">
.cover-menu {
  --el-menu-item-height: 50px;
  --el-menu-base-level-padding: 16px;
  border-right: 0;
  border-radius: 8px;
  background-color: transparent;
  min-width: 55px;
  > .el-menu-item,
  .el-sub-menu {
    --el-menu-text-color: var(--theme-color);
    --el-menu-hover-bg-color: #ecf5ff;
    border-radius: 10px;
    margin-bottom: 15px;
    font-size: 16px;
    background-color: #fff;
    box-shadow: 0px 2px 20px 0px rgba(82, 82, 82, 0.2);
    &.is-active {
      --el-menu-text-color: #fff !important;
      --el-menu-hover-bg-color: rgba(255, 255, 255, 0.5);
      background-color: var(--theme-bg-color);
      .el-icon {
        ::v-deep(svg) {
          g {
            &:first-child {
              path {
                fill: white;
              }
            }
          }
        }
      }
      .el-menu-item {
        color: #fff;
        border-radius: 4px;
        &:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
        &.is-active {
          background-color: #fff;
          color: var(--theme-color);
          .plot {
            background-color: var(--theme-color);
          }
        }
        .plot {
          background-color: #fff;
        }
      }
      :deep(.el-menu) {
        background-color: var(--theme-bg-color);
      }
    }
    .el-menu-item {
      --el-menu-hover-bg-color: #ecf5ff;
      --el-menu-text-color: var(--theme-bg-color) !important;
      --el-menu-base-level-padding: 10px;
      --el-menu-level-padding: 5px;
    }
    :deep(.el-menu) {
      background-color: #fff;
      padding: 0 15px 10px;
      border-radius: 15px;
    }
    :deep(.el-sub-menu__title) {
      border-radius: 10px;
      overflow: hidden;
    }
  }
}
</style>
