import VueElectron from 'vue-electron'

const IPC = VueElectron.ipcRenderer

let languageChangeTimeout = null

export const setupLanguageListener = (vm) => {
  IPC.on('language:changed', (event, lang) => {
    if (vm && vm.$i18n) {
      if (languageChangeTimeout) {
        clearTimeout(languageChangeTimeout)
      }
      languageChangeTimeout = setTimeout(() => {
        vm.$i18n.locale = lang
        languageChangeTimeout = null
      }, 50)
    }
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
  { value: 'zh-CN', label: '简体中文' },
  { value: 'ja-JP', label: '日本語' },
  { value: 'ko-KR', label: '한국어' },
  { value: 'fr-FR', label: 'Français' }
]
