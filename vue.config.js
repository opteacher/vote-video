module.exports = {
  assetsDir: 'vote-video',
  devServer: {
    proxy: {
      '/vote-video/(mdl|api|job)': {
        target: 'http://opteacher.top',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
