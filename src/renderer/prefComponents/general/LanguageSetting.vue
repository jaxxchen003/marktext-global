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
    <el-dialog
      :visible.sync="showConfirmDialog"
      :title="$t('settings.languageChangeConfirm')"
      width="30%"
      :close-on-click-modal="false"
    >
      <span>{{ $t('settings.languageChangeMessage') }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelLanguageChange">{{ $t('settings.cancel') }}</el-button>
        <el-button type="primary" @click="confirmLanguageChange">{{ $t('settings.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Select, Option, Dialog, Button } from 'element-ui'
import { getUserLanguage, setLanguage } from '@/util/language-switcher'

export default {
  name: 'LanguageSetting',
  components: {
    'el-select': Select,
    'el-option': Option,
    'el-dialog': Dialog,
    'el-button': Button
  },
  data () {
    return {
      currentLang: 'en-US',
      previousLang: 'en-US',
      showConfirmDialog: false,
      languages: [
        { code: 'en-US', nativeLabel: 'English' },
        { code: 'zh-CN', nativeLabel: '简体中文' },
        { code: 'ja-JP', nativeLabel: '日本語' },
        { code: 'ko-KR', nativeLabel: '한국어' },
        { code: 'fr-FR', nativeLabel: 'Français' }
      ]
    }
  },
  async created () {
    this.currentLang = await getUserLanguage()
    this.previousLang = this.currentLang
  },
  methods: {
    onLanguageChange () {
      this.showConfirmDialog = true
    },
    async confirmLanguageChange () {
      this.showConfirmDialog = false
      this.previousLang = this.currentLang
      await setLanguage(this.currentLang)
      this.$i18n.locale = this.currentLang
    },
    cancelLanguageChange () {
      this.showConfirmDialog = false
      this.currentLang = this.previousLang
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
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>

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
