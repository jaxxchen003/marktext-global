const menuTranslations = require('./menu-translations')
const { registerIpcHandlers, getUserLanguage } = require('./ipc')

module.exports = {
  menuTranslations,
  registerIpcHandlers,
  getUserLanguage,
  getMenuLabels: (lang = 'en-US') => menuTranslations[lang] || menuTranslations['en-US']
}
