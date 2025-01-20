import { fileURLToPath, URL } from 'node:url'
// import { dirname } from 'node:path'
// import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Legacy from '@vitejs/plugin-legacy'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Eslint from 'vite-plugin-eslint'
// import { customCollectionsAlias, customCollectionsBase } from './config/base'

export default defineConfig({
  base: './',
  define: {},
  server: {
    host: '0.0.0.0',
    port: 8070
  },
  plugins: [
    vue(),
    Pages({
      dirs: 'src/pages',
      extensions: ['vue', 'js'],
      exclude: ['**/components/*/*.vue', '**/*/components/*.vue', '**/resource.js'],
      importMode: 'async',
      moduleId: '~pages',
      extendRoute: route => {
        return {
          ...route
        }
      },
      onRoutesGenerated(routes) {
        return routes
      }
    }),
    Layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'default'
    }),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/head', '@vueuse/core', 'vue-i18n'],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'icon',
          componentPrefix: 'icon',
          // enabledCollections: ['ep', 'mdi', ...customCollectionsAlias],
          enabledCollections: ['ep', 'mdi'],
          customCollections: {
            // ...customCollectionsBase
          }
        })
      ],
      // dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
        filepath: 'eslintrc-auto-import.js',
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/ // .vue
      ]
    }),
    Components({
      dirs: ['src/components', 'src/components/*', 'src/assets/icon-svg/*'],
      dts: 'src/auto-components.d.ts',
      deep: false,
      types: [
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView']
        }
      ],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'icon',
          // enabledCollections: ['ep', 'mdi', ...customCollectionsAlias],
          enabledCollections: ['ep', 'mdi'],
          customCollections: {
            // ...customCollectionsBase
          }
        })
      ],
      extensions: ['vue', 'js', 'jsx'],
      include: [/\.vue$/, /\.vue\?vue/, /\.js$/, /\.jsx$/, /\.ts$/, /\.tsx$/]
    }),
    Icons({
      autoInstall: true,
      compiler: 'vue3',
      // enabledCollections: ['ep', 'mdi', ...customCollectionsAlias],
      enabledCollections: ['ep', 'mdi'],
      customCollections: {
        // ...customCollectionsBase
      }
    }),
    Legacy({ targets: ['defaults', 'not IE 11'] }),
    // VueI18nPlugin({
    //   include: [path.resolve(dirname(getCurrentDir()), './src/i18n/lib/**')]
    // }),
    vueJsx(),
    vueDevTools(),
    Eslint({
      include: ['src/**/*.js', 'src/**/*.vue'],
      cache: false
    })
  ],
  css: {},
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
