module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './oc'
    : './',
  outputDir: "dist",
  lintOnSave: true,
  runtimeCompiler: false,
  productionSourceMap: false,
  devServer: {
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: null,
    disableHostCheck: true,
  }
};