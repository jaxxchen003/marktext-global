const { app, ipcMain, BrowserWindow, Menu } = require('electron')
const fs = require('fs')
const path = require('path')
const { buildMenuTemplate } = require('../menu/langMenu')

const getUserLanguage = () => {
  try {
    const settingPath = path.join(app.getPath('userData'), 'globalSetting.json')
    const settings = JSON.parse(fs.readFileSync(settingPath, 'utf8'))
    return settings.language || 'en-US'
  } catch (e) {
    return 'en-US'
  }
}

const saveUserLanguage = (lang) => {
  try {
    const settingPath = path.join(app.getPath('userData'), 'globalSetting.json')
    const settings = fs.existsSync(settingPath)
      ? JSON.parse(fs.readFileSync(settingPath, 'utf8'))
      : {}
    settings.language = lang
    fs.writeFileSync(settingPath, JSON.stringify(settings, null, 2))
    return true
  } catch (e) {
    console.error('Failed to save language:', e)
    return false
  }
}

const rebuildMenu = (lang) => {
  try {
    const template = buildMenuTemplate(lang)
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  } catch (e) {
    console.error('Failed to rebuild menu:', e)
  }
}

const registerIpcHandlers = () => {
  ipcMain.on('get:language', (event) => {
    event.returnValue = getUserLanguage()
  })

  ipcMain.on('set:language', (event, lang) => {
    saveUserLanguage(lang)
    rebuildMenu(lang)
    BrowserWindow.getAllWindows().forEach(win => {
      win.webContents.send('language:changed', lang)
    })
  })
}

module.exports = { registerIpcHandlers, getUserLanguage, saveUserLanguage }
