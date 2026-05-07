import VueElectron from 'vue-electron'

const IPC = VueElectron.ipcRenderer

export const setupLanguageListener = (vm) => {
  IPC.on('language:changed', (event, lang) => {
    if (vm && vm.$i18n) vm.$i18n.locale = lang
  })
}

export const getUserLanguage = () => {
  return IPC.sendSync('get:language')
}

export const setLanguage = (lang) => {
  IPC.send('set:language', lang)
}

export const availableLanguages = [
  { value: 'en-US', label: 'English' },
  { value: 'zh-CN', label: '简体中文' }
]
