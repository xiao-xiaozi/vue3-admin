/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', },
  globals: { ElMessage: 'readonly' },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/max-attributes-per-line': ['warn', { singleline: 3, multiline: 1, }],
    'vue/first-attribute-linebreak': ['warn', {
      "singleline": 'ignore',
      "multiline": "below"
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
  },
}
