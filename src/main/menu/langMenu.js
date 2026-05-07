/**
 * 多语言菜单构建器
 * 根据当前语言设置动态生成菜单标签
 */

const menuTranslations = require('../i18n/menu-translations')

/**
 * 获取翻译标签
 * @param {string} key - 翻译键名
 * @param {string} lang - 语言代码
 * @returns {string} 翻译后的文本
 */
function getLabel (key, lang = 'en-US') {
  const t = menuTranslations[lang] || menuTranslations['en-US']
  return t[key] || key
}

/**
 * 构建应用程序菜单（支持多语言）
 * @param {string} lang - 语言代码 'zh-CN' | 'en-US'
 * @returns {Array} Electron Menu 模板
 */
function buildMenuTemplate (lang) {
  const l = (key) => getLabel(key, lang)

  return [
    {
      label: l('file'),
      submenu: [
        { label: l('newTab'), accelerator: 'CmdOrCtrl+N' },
        { type: 'separator' },
        { label: l('openFile'), accelerator: 'CmdOrCtrl+O' },
        { label: l('openFolder'), accelerator: 'CmdOrCtrl+Shift+O' },
        { type: 'separator' },
        { label: l('save'), accelerator: 'CmdOrCtrl+S' },
        { label: l('saveAs'), accelerator: 'CmdOrCtrl+Shift+S' },
        { type: 'separator' },
        { label: l('preferences'), accelerator: 'CmdOrCtrl+,' },
        { type: 'separator' },
        { label: l('quit'), accelerator: 'CmdOrCtrl+Q' }
      ]
    },
    {
      label: l('edit'),
      submenu: [
        { label: l('undo'), accelerator: 'CmdOrCtrl+Z', role: 'undo' },
        { label: l('redo'), accelerator: 'CmdOrCtrl+Shift+Z', role: 'redo' },
        { type: 'separator' },
        { label: l('cut'), accelerator: 'CmdOrCtrl+X', role: 'cut' },
        { label: l('copy'), accelerator: 'CmdOrCtrl+C', role: 'copy' },
        { label: l('paste'), accelerator: 'CmdOrCtrl+V', role: 'paste' },
        { label: l('selectAll'), accelerator: 'CmdOrCtrl+A', role: 'selectAll' },
        { type: 'separator' },
        { label: l('find'), accelerator: 'CmdOrCtrl+F' },
        { label: l('replace'), accelerator: 'CmdOrCtrl+H' }
      ]
    },
    {
      label: l('view'),
      submenu: [
        { label: l('sourceCodeMode'), accelerator: 'CmdOrCtrl+Alt+S' },
        { label: l('typewriterMode') },
        { label: l('focusMode') },
        { type: 'separator' },
        { label: l('fullScreen'), accelerator: 'F11', role: 'togglefullscreen' }
      ]
    },
    {
      label: l('window'),
      submenu: [
        { label: l('minimiz'), accelerator: 'CmdOrCtrl+M', role: 'minimize' },
        { label: l('zoomIn'), accelerator: 'CmdOrCtrl+=', role: 'zoomin' },
        { label: l('zoomOut'), accelerator: 'CmdOrCtrl+-', role: 'zoomout' }
      ]
    },
    {
      label: l('help'),
      submenu: [
        { label: l('quickStart') },
        { label: l('markdownRef') },
        { type: 'separator' },
        { label: l('changelog') },
        { label: l('donate') },
        { type: 'separator' },
        { label: l('reportIssue') },
        { label: l('checkUpdates') },
        { type: 'separator' },
        { label: l('about') }
      ]
    }
  ]
}

module.exports = { buildMenuTemplate, getLabel }
