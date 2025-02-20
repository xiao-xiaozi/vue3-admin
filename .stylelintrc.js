export default {
  plugins: [
    "@stylistic/stylelint-plugin"
  ],
  extends: [
    "stylelint-config-standard",
    "stylelint-config-standard-scss",
    "stylelint-config-recommended-vue"
  ],
  customSyntax: 'postcss-html',
  rules: {
    "selector-class-pattern": "[a-z]+[-_]?",
    // 'declaration-property-value-disallowed-list':[]
    
    // stylistic rules from @stylistic/stylelint-plugin:
    "@stylistic/indentation": 2
  }
}