const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
    transpileDependencies: true,
    chainWebpack: (config) => {
        config.module
            .rule("pug")
            .test(/\.pug$/)
            .use("pug-plain-loader")
            .loader("pug-plain-loader")
            .end()
            .use("vue-pug-loader")
            .loader("vue-pug-loader")
            .end()
    },
})
