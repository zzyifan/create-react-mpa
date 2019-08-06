const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 获取多页面入口文件
 * @param {String} globPath 文件路径
 * @param {Boolean} isEnvDevelopment 是否为开发环境
 * @param {Boolean} isEnvProduction 是否为生产环境
 */
function getMpaConfig(appMpaSrc, isEnvDevelopment, isEnvProduction) {
  const globPath = `${appMpaSrc}/**/index.js`
  // console.log("globPath", globPath)
  const moduleNameReg = /pages\/(.*)\//i;

  let res = glob.sync(globPath).reduce((result, entry) => {

    // 获取模块名称, 兼容首页为 main
    let moduleName = moduleNameReg.exec(entry) ? moduleNameReg.exec(entry)[1] : "main";
    let modulePath = moduleName === 'main' ? '' : `${moduleName}/`;
    // 入口配置
    result.entry[moduleName] = [
      isEnvDevelopment &&
      require.resolve('react-dev-utils/webpackHotDevClient'),
      `./src/pages/${modulePath}index.js`,
    ].filter(Boolean)

    // HtmlWebpackPlugin
    result.HtmlWebpackPlugin.push(new HtmlWebpackPlugin(
      Object.assign({}, {
          inject: true,
          chunks: [moduleName],
          template: `src/pages/${modulePath}index.html`,
          filename: `${modulePath}index.html`,
        },
        isEnvProduction ? {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        } :
        undefined
      )
    ))

    return result
  }, {
    entry: {},
    HtmlWebpackPlugin: []
  });

  // console.log(JSON.stringify(res))
  return res;
}

module.exports = {
  getMpaConfig
}