## Vue3 基础模板

它基于Vue 3 + ESLint 9 + Vite 5等技术，构建了一个现代化且高效的项目架构。旨在针对过往架构中存在的性能瓶颈、组件重复利用效率低下、声明冗余以及结构复杂混乱等问题，提出全面的解决方案。

## 项目目录介绍

```
── config
|  └── defineWeb.js
├── public
|  └── favicon.ico
├── src
|  ├── api
|  ├── assets
|  ├── global
|  ├── i18n
|  ├── layouts
|  ├── pages
|  ├── request
|  ├── router
|  ├── store
|  ├── App.vue
|  └── main.js
├── .gitignore
├── .prettierignore
├── .prettierrc
├── README.md
├── eslint.config.js
├── eslintrc-auto-import.js
├── index.html
├── jsconfig.json
├── package.json
├── pnpm-lock.yaml
└── vite.config.js
```

### config

为了增强项目对不同API配置的兼容性，我们决定采用环境变量来进行灵活配置，并赋予这些变量以覆盖当前设置的能力。值得注意的是，defineWeb.js 文件中的变量需要手动注入。因此，在构建 vite.config 文件时，请确保生成静态环境变量，若后续有新增内容，请按顺序逐一添加，以确保配置的一致性和完整性，新增的环境变量可在 import.meta.env 访问。

### global

项目全局常量配置，一般用于全局通用配置

### i18n

本项目集成了 vue-i18n 插件，i18n lib 目录下是对应的语言 json 文件，注意 语言文件格式不可调整，因为 .vscode 配置集成了 i18n-ally 插件，可扫描当前内 i18n 使用情况以及自动翻译等功能，如果想要激活该功能请先安装 i18n-ally 插件，安装后可在左侧 vscode 功能找到 i18n-ally 菜单。

### routes

本项目集成了 vite-plugin-pages 插件，这与 vite-plugin-vue-layouts 配合使用效果最佳。不在手动注册路由文件，变更为自动识别文件夹名字以及层级转换成路由层级关系，所以为了保持路由的纯净请不要在菜单文件内加入其他文件夹。如果有修改配置 exclude 内容

示例效果

```
src/pages/users/index.vue -> /users (/users)
src/pages/users/[id].vue -> /users/:id (/users/id)
src/pages/[user]/settings.vue -> /:user/settings (/one/settings)
```

vite.config.js

```
plugins: [
  Pages({
    dirs: 'src/pages', // 指定识别文件夹转换路由入口
    extensions: ['vue', 'js'], // 有效文件内容
    baseRoute: '', // 前缀路由配置
    exclude: ['**/components/*.vue'], // 排除文件
    importMode: 'async', // 文件异步加载
    moduleId: '~pages'
  }),
]
```

### layouts

本项目集成了 vite-plugin-vue-layouts 插件，这与 vite-plugin-pages 配合使用效果最佳。可以在route meta 指定 layout 布局模块，没有指定布局的页面使用default.vue作为其布局。如果想要指定文件使用指定 layout 格式，请在 .vue 文件顶部加入以下内容

```
<route lang="yaml">
meta:
  layout: other
</route>
```

### pages

本项目集成了 vite-plugin-pages 插件，默认指定 pages 文件夹为路由菜单文件入口，为了保持路由的纯净和文件夹层级的一直，请不要在 pages 内添加其他非路由文件夹配置，如有疑问请看 ### routes 配置

### store

本项目已集成 pinia 插件

## 全局引入

本项目集成了 unplugin-auto-import/vite 插件，vue, vue-router, @vueuse/head, @vueuse/core, vue-i18n等功能都不需要在 import，直接使用即可。

之前

```
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const count = ref(0)
const doubled = computed(() => count.value * 2)

const route = useRoute()

const { locale, t } = useI18n({
  inheritLocale: true,
  useScope: 'local'
})
```

现在

```
const count = ref(0)
const doubled = computed(() => count.value * 2)

const route = useRoute()

const { locale, t } = useI18n({
  inheritLocale: true,
  useScope: 'local'
})
```

## icon 配置

本项目集成了 unplugin-icons/vite 插件，无需在 .vue 文件手动引入 Element-plus Icon，直接使用即可，同时增加了icon的丰富性还增加 Material Icons 等，也可在 assets/icon-svg 目录自定义 svg 图标，使用方式略微有差别。示例如下

[Element-plus Icon](https://element-plus.org/zh-CN/component/icon.html)。

[Material Icons](https://pictogrammers.com/library/mdi/)。

```
<IconEpEdit />

// Icon 是前缀，Ep 是类型， Edit才是 icon本身的名字，这是 Element-plus icon 的使用方式

<IconMdiEdit />

// Icon 是前缀，Mdi 是类型， Edit才是 icon本身的名字，这是 Material Icons icon 的使用方式

<template>
  <IconXm />
</template>

import IconXm from '~icons/custom-icons/xm'


// Icon 是前缀 Xm 是自定义svg的名字，需要在目录 assets/icon-svg 放置 xm.svg 文件 才可正常显示
```

## 项目git提交规范

## 项目样式覆盖
