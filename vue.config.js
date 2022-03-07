const path = require('path')
/**
 * 定位文件夹
 * @param {string} dir
 * @returns {string}
 */
const resolve = dir => path.join(__dirname, '.', dir)
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  // 服务配置
  devServer: {
    hot: true,
    disableHostCheck: true
  },
  // 配置选项...
  publicPath: './', // 部署应用包时的根路径
  assetsDir: './',
  runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本。
  productionSourceMap: false, // 关闭生产环境source map，加速生产环境构建，并减少包体积
  lintOnSave: true, // 保存时 lint 代码
  // CSS配置
  css: {
    sourceMap: false,
    // 为预处理器的 loader 传递自定义选项。
    loaderOptions: {
      sass: {
        // 引入全局变量 @/ 是 src/ 的别名
        // prependData: '@import "@/assets/styles/variables.scss";'
      }
    }
  },
  // 修改webpack相关配置
  chainWebpack: config => {
    // 配置文件alias
    config.resolve.alias
      .set('@assets', resolve('src/assets'))
      .set('@', resolve('src/'))

    if (!isDev) {
      // 去除多余提示
      config.performance.set('hints', false)
      config.devtool('none')
      // 代码分割
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'vendors-chunk',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          vant: {
            name: 'chunk-vant', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?vant(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          },
          utils: {
            name: 'chunk-utils',
            test: resolve('src/assets/scripts'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
    }
  },
  // 第三方插件的选项
  pluginOptions: {
    // ...
  }
}
