module.exports = {
    extends: [
        "stylelint-config-standard",
        "stylelint-config-standard-scss",
        "stylelint-config-recommended-vue"
    ],
    customSyntax: 'postcss-html',
    rules:{
        'indentation': 2,
        // 'declaration-property-value-disallowed-list':[]
    }
}