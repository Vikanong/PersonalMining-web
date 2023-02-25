// @ts-nocheck
const path = require('path')
const resolve = (dir: any) => path.resolve(__dirname, dir)
const CracoLessPlugin = require('craco-less')

module.exports = {
  devServer: {
    proxy: {
      // "/api": {
      //   target: 'http://localhost:3001',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/api": "/api"
      //   }
      // },
    }
  },
  output: {
    filename: 'static/js/[name].js',
    path: path.join(__dirname, '../dist'), // 打包结果输出路径
    publicPath: '/' // 打包后文件的公共前缀路径
  },
  webpack: {
    alias: {
      '@': resolve('src'),
      'views': resolve('src/views'),
      'images': resolve('src/assets/images'),
      'components': resolve('src/components'),
      'modules': resolve('src/modules'),
      'constants': resolve('src/constants'),
      'hooks': resolve('src/hooks'),
      'connectors': resolve('src/connectors'),
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: require('./src/assets/style/colors'),
            javascriptEnabled: true
          }
        }
      }
    },
  ],
  babel: {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          useBuiltIns: 'usage',
          corejs: {
            version: 3,
            proposals: true,
          },
        },
      ],
    ],
    plugins: [
      ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }, 'antd'],
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      ["@babel/plugin-proposal-class-properties", { "loose": true }],
      ["@babel/plugin-proposal-private-methods", { "loose": true }],
      // ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
    ],
    loaderOptions: (babelLoaderOptions, { env, paths }) => { return babelLoaderOptions; }
  },
}
export {}