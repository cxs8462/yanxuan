module.exports = {
  devServer: {
    port: 4000,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: "http://127.0.0.1:8360", // 要跨域的域名
        changeOrigin: true, // 是否开启跨域
        pathRewrite: {
          "/dev-api": "",
        },
      },
    },
  },
  publicPath:'/web/client'
};
