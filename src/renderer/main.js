import Vue from 'vue'
import VueElectron from 'vue-electron'
import sourceMapSupport from 'source-map-support'
import bootstrapRenderer from './bootstrap'
import VueRouter from 'vue-router'
import i18n from './i18n'
import elementUILangEn from 'element-ui/lib/locale/lang/en'
import elementUILangZhCN from 'element-ui/lib/locale/lang/zh-CN'
import elementUILangJa from 'element-ui/lib/locale/lang/ja'
import elementUILangKo from 'element-ui/lib/locale/lang/ko'
import elementUILangFr from 'element-ui/lib/locale/lang/fr'
import locale from 'element-ui/lib/locale'
import axios from './axios'
import store from './store'
import './assets/symbolIcon'
import {
  Dialog,
  Form,
  FormItem,
  InputNumber,
  Button,
  Tooltip,
  Upload,
  Slider,
  Checkbox,
  ColorPicker,
  Col,
  Row,
  Tree,
  Autocomplete,
  Switch,
  Select,
  Option,
  Radio,
  RadioGroup,
  Table,
  TableColumn,
  Tabs,
  TabPane,
  Input
} from 'element-ui'
import services from './services'
import routes from './router'
import { addElementStyle } from '@/util/theme'
import { setupLanguageListener } from '@/util/language-switcher'

import './assets/styles/index.css'
import './assets/styles/printService.css'

// -----------------------------------------------

// Decode source map in production - must be registered first
sourceMapSupport.install({
  environment: 'node',
  handleUncaughtExceptions: false,
  hookRequire: false
})

global.marktext = {}
bootstrapRenderer()

addElementStyle()

// -----------------------------------------------
// Be careful when changing code before this line!

// Configure Vue - 根据当前语言动态加载 Element UI 语言包
const elementLangMap = {
  'en-US': elementUILangEn,
  'zh-CN': elementUILangZhCN,
  'ja-JP': elementUILangJa,
  'ko-KR': elementUILangKo,
  'fr-FR': elementUILangFr
}
const currentLang = i18n.locale || 'en-US'
locale.use(elementLangMap[currentLang] || elementUILangEn)

Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(InputNumber)
Vue.use(Button)
Vue.use(Tooltip)
Vue.use(Upload)
Vue.use(Slider)
Vue.use(Checkbox)
Vue.use(ColorPicker)
Vue.use(Col)
Vue.use(Row)
Vue.use(Tree)
Vue.use(Autocomplete)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Input)

Vue.use(VueRouter)

Vue.use(VueElectron)

// Register i18n
Vue.use(i18n)
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

services.forEach(s => {
  Vue.prototype['$' + s.name] = s[s.name]
})

const router = new VueRouter({
  routes: routes(global.marktext.env.type)
})

/* eslint-disable no-new */
const app = new Vue({
  store,
  i18n,
  router,
  template: '<router-view class="view"></router-view>'
}).$mount('#app')

setupLanguageListener(app)
