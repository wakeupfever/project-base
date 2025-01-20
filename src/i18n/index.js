import { createI18n } from 'vue-i18n'

import en from './lib/en.json'
import zh from './lib/zh.json'

// import messages from '@intlify/unplugin-vue-i18n/messages'

// console.log(messages, 'messages')

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  messages: {
    en,
    zh
  }
})

export default i18n
