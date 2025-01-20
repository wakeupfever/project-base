<route lang="yaml">
name: login
meta:
  layout: login
</route>

<template>
  <div class="login-warp relative">
    <div
      class="login-from bg-[#fff] p-[60px] absolute top-[50%] transform -translate-y-[50%] right-[8%] rounded-[10px]"
    >
      <div class="project-title">
        <div class="login-title leading-[32px]">巨龙园区环保项目管理平台</div>
        <div class="welcome-login flex items-center justify-between">
          <p />
          <p class="leading-[24px]">欢迎登录</p>
          <p />
        </div>
      </div>
      <div class="login-f">
        <ElForm ref="loginFromRef" class="login-form" :rules="rules" :model="loginFrom">
          <div class="login-zh ml-[6px]">
            <div class="login-tip flex row items-center mb-[16px]">
              <ElImage height="22" class="mr-[10px]" :src="account" />
              <span class="text-[#154480]">账号</span>
            </div>
            <ElFormItem prop="username">
              <ElInput
                v-model="loginFrom.username"
                placeholder="请输入用户账号"
                class="custom-input"
                name="username"
                type="text"
                @keyup.enter="handleLogin"
              />
            </ElFormItem>
          </div>
          <div class="login-zh mt-[30px] ml-[6px]">
            <div class="login-tip flex row items-center mb-[16px]">
              <ElImage height="22" class="mr-[10px]" :src="password" />
              <span class="text-[#154480]">密码</span>
            </div>
            <ElFormItem prop="password" class="login-name">
              <ElInput
                v-model="loginFrom.password"
                placeholder="请输入用户密码"
                class="custom-input"
                name="password"
                type="password"
                @keyup.enter="handleLogin"
              />
            </ElFormItem>
          </div>
          <div class="login-zh mt-[30px] ml-[6px]">
            <div class="login-tip flex row items-center mb-[6px]">
              <ElImage height="22" class="mr-[10px] w-[22px]" :src="shape" />
              <span class="text-[#154480]">验证码</span>
            </div>
            <ElFormItem prop="code" class="login-name">
              <div class="box flex flex-col">
                <div class="login-code flex items-center">
                  <ElImage
                    v-if="codeInfo.img"
                    height="50px"
                    :src="codeInfo.img"
                    class="mr-[20px] w-[140px] h-[44px]"
                    @click="_getImgCode"
                  />
                  <ElInput
                    v-model="loginFrom.code"
                    placeholder="请输入验证码"
                    name="password"
                    style="width: 150px"
                    class="codeInp custom-input w-[140px]"
                    @keyup.enter="handleLogin"
                  />
                </div>
                <ElCheckbox v-model="loginFrom.isRemember" @change="handleRemember">
                  记住密码
                </ElCheckbox>
              </div>
            </ElFormItem>
          </div>
          <div class="login-footer mt-[60px]">
            <ElButton
              v-loading="loading"
              class="login-button custom-button flex w-full h-[40px]"
              type="primary"
              :disabled="loading"
              @click="handleLogin"
            >
              <span>登录</span>
            </ElButton>
          </div>
        </ElForm>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSysStore } from '@/store/sys'
import { oauth, checkCode, getImgCode } from '@/api/sys/login'

import account from '@/assets/images/login/account.png'
import password from '@/assets/images/login/password.png'
import shape from '@/assets/images/login/shape.png'
import { ElCheckbox, ElMessage } from 'element-plus'

const router = useRouter()
const sysStore = useSysStore()

const loginFrom = ref({
  username: '',
  password: '',
  code: '',
  isRemember: false
})

const codeInfo = ref({})
const loginFromRef = ref(null)
const loading = ref(false)

const rules = {
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const handleLogin = async () => {
  if (!loginFrom.value.code) {
    ElMessage.warning('验证码不能为空')
    return
  }
  const { data, code } = await checkCode({
    codeRandomCache: codeInfo.value.codeRandomCache,
    captchaCode: loginFrom.value.code
  })
  if (!data && code === 200) {
    loginFromRef.value.validate(valid => {
      if (valid) {
        loading.value = true

        oauth(loginFrom.value)
          .then(res => {
            if (res?.success) {
              const { token_type, access_token } = res.data
              sysStore.setData('oauth', res.data)
              sysStore.setToken(`${token_type} ${access_token}`)
              router.push('/')
            }
          })
          .finally(() => {
            loading.value = false
          })
      }
    })
  } else {
    ElMessage.warning('验证码错误')
    _getImgCode()
    loginFrom.value.code = ''
  }
}

const handleRemember = () => {
  if (loginFrom.value.isRemember) {
    localStorage.setItem('remember', JSON.stringify(loginFrom.value))
  } else {
    localStorage.removeItem('remember')
  }
}

const _getRemember = () => {
  const remember = localStorage.getItem('remember')
  if (remember) {
    loginFrom.value = JSON.parse(remember)
  }
}

const _getImgCode = async () => {
  const res = await getImgCode()
  if (typeof res == 'object') {
    codeInfo.value = {
      img: `data:image/png;base64,${res.captchaCodeBase64}`,
      codeRandomCache: res.codeRandomCache
    }
  }
}

_getRemember()
_getImgCode()
</script>

<style scoped>
.login-warp {
  --login-box--width: 560px;
  --login-box--height: 680px;
  --login-box--spacing: 20px;
  --login-box--color: #2267c0;
  --login-box--tipColor: #154480;

  background-image: url('@/assets/images/login/login_bg3.png');
  background-size: 100% 100%;
  height: 100vh;
  width: 100vw;
  position: relative;
  top: 0;
  left: 0;
  z-index: 100;
  .project-title {
    .login-title {
      font-weight: 600;
      font-size: 32px;
      color: var(--login-box--color);
      text-align: center;
    }

    .welcome-login {
      margin: 24px 0 50px;

      & > p:first-child {
        width: 120px;
        height: 2px;
        background: linear-gradient(135deg, rgba(34, 103, 192, 0) 0%, #2267c0 70%);
        border-radius: 8px 8px 8px 8px;
      }

      & > p:nth-child(2) {
        color: var(--login-box--tipColor);
        font-weight: 600;
        font-size: 24px;
      }

      & > p:last-child {
        width: 120px;
        height: 2px;
        background: linear-gradient(270deg, rgba(34, 103, 192, 0) 0%, #2267c0 70%);
        border-radius: 8px 8px 8px 8px;
      }
    }
  }
  .login-from {
    width: var(--login-box--width);
    height: var(--login-box--height);
    &::before,
    &::after {
      content: '';
      z-index: -1;
      box-shadow: 0px 4px 35px 4px rgba(84, 120, 246, 0.1);
      border-radius: 10px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    &::before {
      width: calc(var(--login-box--width) + var(--login-box--spacing) * 2);
      height: calc(var(--login-box--height) - var(--login-box--spacing) * 2);
      left: calc(50% - var(--login-box--width) / 2 - var(--login-box--spacing));
      background-color: rgba(255, 255, 255, 0.5);
    }
    &::after {
      width: calc(var(--login-box--width) + var(--login-box--spacing) * 4);
      height: calc(var(--login-box--height) - var(--login-box--spacing) * 4);
      left: calc(50% - var(--login-box--width) / 2 - var(--login-box--spacing) * 2);
      background-color: rgba(255, 255, 255, 0.16);
    }
  }
}
.custom-input {
  :deep(&.el-input) {
    --el-input-height: 46px;
    --el-border-color: #92a0cd;
    --el-text-color-placeholder: #92a0cd;
    --color: #92a0cd;
    --el-input-border-color: #e3e7ee;
    font-size: 18px;
    .el-input__inner {
      font-size: 14px;
      &::placeholder {
        font-size: 14px;
      }
    }
  }
}
.custom-button {
  height: 48px;
}
</style>
