

module.exports = {
    publicPath: "/dist",
    devServer : {
        proxy: {
            "/api" : {
                target: "http://www.test.my-site.com",
            }
        }
    },
    configureWebpack: require("./webpack.config"), //打包在node环境
}