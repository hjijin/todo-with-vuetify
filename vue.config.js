const port = process.env.PORT || process.env.npm_config_port || 9093

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: port,
    disableHostCheck: true,
    host: 'localhost',
    https: false,
    open: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    proxy: {
      'api/v1/': {
        target: process.env.VUE_APP_LOCAL_SERVER === '1' ? 'http://localhost:3000/api/v1/' : 'https://devc.sample.com/api/v1/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1': '',
        },
      },
    },
  },
}
