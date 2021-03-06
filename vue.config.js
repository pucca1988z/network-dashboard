module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './oc'
    : './xxx',
  outputDir: "dist",
  lintOnSave: true,
  runtimeCompiler: false,
  productionSourceMap: false,
  devServer: {
    port: 8088,
    https: false,
    hotOnly: false,
    proxy: null,
    disableHostCheck: true,
  }
};