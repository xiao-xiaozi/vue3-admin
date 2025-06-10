import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ElMessage: 'readonly',
        ElMessageBox: 'readonly',
        process: 'readonly',
        APP_VERSION: 'readonly',
        ref: 'readonly',
        computed: 'readonly',
        watch: 'readonly',
        watchEffect: 'readonly',
        onMounted: 'readonly'
      },
    },
  },
  {
    rules: {
      // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'vue/max-attributes-per-line': ['warn', { singleline: 3, multiline: 1, }],
      'vue/first-attribute-linebreak': ['warn', {
        "singleline": 'ignore',
        "multiline": "below"
      }],
      "vue/html-closing-bracket-newline": ["error", {
        "singleline": "never",
        "multiline": "never"
      }],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-indent': ['error', 2, {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      }],
      "key-spacing": [
        2,
        {
          beforeColon: false,
          afterColon: true,
        }
      ],
      "object-curly-newline": ["error", {
        "ObjectExpression": { "multiline": true, "minProperties": 3 },
        "ObjectPattern": { "multiline": true, "minProperties": 3 },
        "ImportDeclaration": "never",
        "ExportDeclaration": { "multiline": true, "minProperties": 3 }
      }],
      "object-curly-spacing": [
        2,
        "always",
        { objectsInObjects: false, },
      ],
      "object-shorthand": ["error", "always"],
      "indent": [
        2,
        2,
        { SwitchCase: 1 },
      ],
    }
  }
]