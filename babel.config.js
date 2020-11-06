let prodplugins = []
if (process.env.mode == 'production') {
  prodplugins.push('ransform-remove-console')
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ...prodplugins,
    '@babel/plugin-syntax-dynamic-import'
  ]
}
