module.exports = {
  plugins: {
    // 以iphone6设计稿为基础尺寸做rem换算
    'postcss-pxtorem': {
      rootValue: 100,
      propList: ['*']
    }
  }
}
