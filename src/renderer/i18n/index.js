import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueElectron from 'vue-electron'

Vue.use(VueI18n)
Vue.use(VueElectron)

const messages = {
  'en-US': require('./locales/en-US.json'),
  'zh-CN': require('./locales/zh-CN.json')
}

export default new VueI18n({
  locale: Vue.electron.ipcRenderer.sendSync('get:language') || 'en-US',
  fallbackLocale: 'en-US',
  messages
})
