module.exports = {
  assetsDir: 'vote-video',
  devServer: {
    proxy: {
      '/vote-video/(mdl|api|job)': {
        target: 'http://opteacher.top',
        ws: true,
        changeOrigin: true
      },
      '/vote-video/cors/rand_image': {
        target: 'https://api.ixiaowai.cn/gqapi/gqapi.php',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
