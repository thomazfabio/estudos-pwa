const { defineConfig } = require('@vue/cli-service')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = defineConfig({
  configureWebpack:{
    plugins: [new MiniCssExtractPlugin()],
  },
  transpileDependencies: [
    'vuetify'
  ]
})
