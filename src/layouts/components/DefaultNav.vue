<template>
  <div
    class="default-nav px-[24px] py-[16px] h-[80px] bg-[#fff] rounded-[10px] flex items-center justify-between"
  >
    <div class="default-nav__left flex items-center flex-row">
      <div class="logo flex items-center">
        <div class="logo-left flex items-center">
          <IconMenuLogo style="width: 30px; height: 30px" class="mr-[10px]" />
          <dpv class="font-YaHei truncate flex-1 text-[#154480] font-bold text-[26px]">
            环保管理系统
          </dpv>
        </div>
        <div class="logo-right">
          <div class="line w-[1px] h-[48px] bg-[#DFE3ED] mx-[40px]" />
        </div>
      </div>
      <div class="router-history flex items-center flex-1">
        <div
          v-for="(item, index) in history"
          :key="index"
          class="router-history-item mx-[5px] flex items-center cursor-pointer"
          :class="{ active: item.path === route.path }"
          @click="handleClick(item, index)"
        >
          <span>{{ item.meta.name?.split('-')[1] }}</span>
          <ElIcon
            v-if="index !== history.length"
            class="close-icon"
            @click.stop="removeHistory(index)"
          >
            <IconEpClose />
          </ElIcon>
        </div>
        <!-- <div class="router-history-item mx-[5px] flex items-center cursor-pointer">
          <span class="text-[18px] text-[#2267C0] leading-[20px] mr-[12px]">更多</span>
          <ElIcon size="20">
            <IconDtMenu />
          </ElIcon>
        </div> -->
      </div>
    </div>
    <div class="default-nav__right flex items-center">
      <div
        ref="gatewayActiveRef"
        class="nav-menu px-[9px] py-[9px] flex items-center bg-[#EFF5FC] h-[40px] rounded-[3px] mr-[44px] cursor-pointer"
      >
        <ElIcon size="20" class="mr-[6px]">
          <IconDtNavMenu />
        </ElIcon>
        <ElIcon size="12">
          <IconEpCaretBottom />
        </ElIcon>
      </div>
      <div
        class="notice icon-item h-[48px] w-[48px] rounded-[24px] mr-[20px] flex items-center justify-center cursor-pointer"
        @click="handleNotice"
      >
        <ElIcon size="20">
          <IconDtNotice />
        </ElIcon>
      </div>
      <div
        class="screen icon-item h-[48px] w-[48px] rounded-[24px] mr-[20px] flex items-center justify-center cursor-pointer"
        @click="handleFullScreen"
      >
        <ElIcon size="20">
          <IconDtScreen />
        </ElIcon>
      </div>
      <div
        ref="personalActiveRef"
        class="personal icon-item h-[48px] w-[48px] rounded-[24px] flex items-center justify-center cursor-pointer"
      />
    </div>

    <!-- 其他项目地址 -->
    <ElPopover
      ref="gatewayPopoverRef"
      :virtual-ref="gatewayActiveRef"
      placement="bottom"
      trigger="click"
      width="240"
    >
      <div class="screen-select-area">
        <div
          v-for="(item, index) in screenAry"
          :key="`k-${index}`"
          @click.stop="handleJumpTo(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </ElPopover>

    <!-- 其他项目地址 -->
    <ElPopover
      ref="personalPopoverRef"
      :virtual-ref="personalActiveRef"
      placement="bottom"
      trigger="click"
    >
      <div class="screen-select-area">
        <div @click.stop>个人配置</div>
        <div @click.stop>密码修改</div>
        <div @click.stop="handleLogout">退出登录</div>
      </div>
    </ElPopover>
  </div>
</template>

<script setup>
import { useSysStore } from '@/store/sys'

const route = useRoute()
const router = useRouter()
const sysStore = useSysStore()

const history = ref([])
const gatewayActiveRef = ref(null)
const gatewayPopoverRef = ref(null)

const personalActiveRef = ref(null)
const personalPopoverRef = ref(null)

const maxHistory = 3

const screenAry = []

const handleFullScreen = () => {
  if (document.fullscreenEnabled) {
    const el = document.querySelector('html')
    if (!document.fullscreenElement) {
      el.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  } else {
    ElMessage.warning('抱歉!本浏览器不支持全屏模式')
  }
}

const handleLogout = () => {
  ElMessageBox.confirm('确定要退出登录吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    sysStore.logout()
    router.push('/login')
  })
}

const handleNotice = () => {
  ElMessage.warning('消息中心开发中...')
}

const handleJumpTo = item => {
  if (item.url) {
    window.open(`${item.url}?token=${window.sessionStorage.getItem('token')}`)
  }
}

const initHistory = () => {
  const historyStorage = window.sessionStorage.getItem('router-history') ?? '[]'
  history.value = JSON.parse(historyStorage)
}

const addHistory = r => {
  const index = history.value.findIndex(item => item.path === r.path)
  if (index === -1) {
    history.value.push({ ...r })
  } else {
    // history.value.splice(index, 1)
    // history.value.push({ ...r })
  }
  history.value = history.value.slice(-maxHistory)
  window.sessionStorage.setItem('router-history', JSON.stringify(history.value))
}

const removeHistory = index => {
  history.value.splice(index, 1)
  window.sessionStorage.setItem('router-history', JSON.stringify(history.value))
}

const handleClick = (item, index) => {
  history.value.splice(index, 1, item)
  history.value = history.value.slice(-maxHistory)
  router.push(item.path)
}

initHistory()

watch(
  () => route.path,
  () => {
    addHistory(route)
  }
)
</script>

<style scoped>
.screen-select-area {
  color: #154480;

  & > div {
    padding: 8px;
    cursor: pointer;

    &:hover {
      background: #2267c0;
      color: white;
      border-radius: 6px;
    }
  }
}

.default-nav {
  box-shadow: 0px 2px 20px 0px rgba(82, 82, 82, 0.2);
}

.personal {
  background: url('@/assets/images/personal-default.png') no-repeat center center;
  background-size: 100% 100%;
}

.icon-item {
  box-shadow: 0px 4px 12px 0px rgba(40, 98, 173, 0.3);
}

.router-history-item {
  position: relative;
  height: 40px;
  line-height: 40px;
  padding: 0 16px;
  margin-left: 16px;
  font-size: 16px;
  color: #788eaa;
  background-color: #e4edf5;
  white-space: nowrap;
  border-radius: 2px;
  transition: all 0.3s;
  .close-icon {
    width: 28px;
    text-align: center;
    transition: width 0.5s linear;
    &:hover {
      color: #2267c0;
      transform: scale(1.5);
    }
    &.hide {
      width: 0;
    }
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    display: block;
    width: 20px;
    height: 40px;
    background-color: #e4edf5;
    transition: all 0.3s;
  }
  &::before {
    left: -10px;
    border-radius: 2px;
    clip-path: path('M 0 0 L 20 0 L 20 40 L 10 40 A 10 40 0 0 1 8 38 Z');
  }
  &::after {
    right: -10px;
    border-radius: 2px;
    clip-path: path('M 10 0 A 10 0 0 0 1 12 2 L 20 40 L 0 40 L 0 0 Z');
  }

  &.active {
    color: #fff;
    background-color: #2267c0;
    &::before,
    &::after {
      background-color: #2267c0;
    }
  }

  &:last-child {
    &::after {
      display: none;
    }
  }

  &:first-child {
    margin-left: 0;
    &::before {
      display: none;
    }
  }
}
</style>
