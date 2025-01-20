import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import prettier from 'eslint-plugin-prettier'
import eslintrcAutoImport from './eslintrc-auto-import.js'

const specialEslintConfig = {
  process: true,
  ElMessage: true,
  ElMessageBox: true
}

export default [
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...eslintrcAutoImport.globals,
        ...specialEslintConfig
      }
    }
  },
  pluginJs.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  ...pluginVue.configs['flat/recommended'],
  {
    ignores: [
      'node_modules/',
      'dist/',
      'public/',
      '.git',
      '.vscode/',
      '.husky/',
      'tailwind.config.js',
      'eslintrc-auto-import.js',
      'postcss.config.js',
      '**/.*',
      'config/',
      'build/',
      '!.build',
      '.build/*'
    ]
  },
  {
    plugins: {
      prettier: prettier
    },
    ignores: ['node_modules', 'dist', 'public', '.husky'],
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'off',
      'no-restricted-globals': 'off',
      'no-restricted-syntax': 'off',
      'vue/multi-word-component-names': 'off',
      'no-multiple-empty-lines': ['warn', { max: 1 }],
      'vue/valid-template-root': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off'
    }
  }
]
