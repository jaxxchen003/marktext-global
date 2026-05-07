import VueElectron from 'vue-electron'
const IPC = VueElectron.ipcRenderer

export function setupLanguageListener(vm) {
  IPC.on('language:changed', (event, lang) => {
    if (vm && vm.$i18n) vm.$i18n.locale = lang
  })
}

export function setLanguage(vm, lang) {
  if (vm && vm.$i18n) vm.$i18n.locale = lang
  IPC.send('set:language', lang)
}

export const availableLanguages = [
  { value: 'en-US', label: 'English' },
  { value: 'zh-CN', label: '简体中文' }
]
