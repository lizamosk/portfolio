import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import prettierConfig from 'eslint-config-prettier/flat'
import globals from 'globals'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-ignore',
    ignores: ['dist/**', 'dist-ssr/**', 'coverage/**', 'public/**'],
  },

  js.configs.recommended,
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,

  {
    // Base UI primitives (Button, Input, ...) are intentionally single-word
    name: 'app/base-components',
    files: ['src/components/base/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },

  {
    name: 'app/node-config-files',
    files: ['*.config.js', '.claude/hooks/**/*.mjs'],
    languageOptions: {
      globals: globals.node,
    },
  },

  // Must stay last: turns off rules that conflict with Prettier formatting
  prettierConfig
)
