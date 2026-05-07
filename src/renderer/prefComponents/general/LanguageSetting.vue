<template>
  <div class="language-setting">
    <div class="setting-item">
      <div class="setting-label">
        <span class="title">{{ $t('settings.languageLabel') }}</span>
        <span class="desc">{{ $t('settings.languageDesc') }}</span>
      </div>
      <div class="setting-control">
        <el-select
          v-model="currentLang"
          @change="onLanguageChange"
          class="lang-select"
          size="small"
        >
          <el-option
            v-for="lang in languages"
            :key="lang.code"
            :label="lang.nativeLabel"
            :value="lang.code"
          />
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
import { Select, Option } from 'element-ui'
import { getUserLanguage, setLanguage } from '@/util/language-switcher'

export default {
  name: 'LanguageSetting',
  components: {
    'el-select': Select,
    'el-option': Option
  },
  data () {
    return {
      currentLang: 'en-US',
      languages: [
        { code: 'en-US', nativeLabel: 'English' },
        { code: 'zh-CN', nativeLabel: '简体中文' }
      ]
    }
  },
  async created () {
    this.currentLang = await getUserLanguage()
  },
  methods: {
    async onLanguageChange () {
      await setLanguage(this.currentLang)
      this.$i18n.locale = this.currentLang
    }
  }
}
</script>

<style scoped>
.language-setting {
  padding: 12px 0;
}
.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 1px solid var(--sideBarBgColor, #e0e0e0);
}
.setting-label .title {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--editorColor, #333);
}
.setting-label .desc {
  display: block;
  font-size: 12px;
  color: var(--editorColor50, #888);
  margin-top: 2px;
}
.lang-select {
  min-width: 120px;
}
</style>
