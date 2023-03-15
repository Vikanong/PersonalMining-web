// craco.config.js
const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)
const CracoLessPlugin = require('craco-less')

module.exports = {
  webpack: {
    alias: {
      '@': resolve('src'),
      'views': resolve('src/views'),
      'constants': resolve('src/constants'),
      'hooks': resolve('src/hooks'),
      'connection': resolve('src/connection'),
      'connectors': resolve('src/assets/connectors'),
      'components': resolve('src/components'),
      'images': resolve('src/assets/images')
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@desktop': "~'only screen and (min-width: 760px)'",
              '@mobile': "~'only screen and (max-width: 760px)'",
            },
            javascriptEnabled: true
          }
        }
      }
    },
  ],
}
