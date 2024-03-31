const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
    transpileDependencies: true,
    chainWebpack: (config) => {
        const pugRule = config.module.rule("pug")
        const svgRule = config.module.rule("svg")

        pugRule
            .test(/\.pug$/)
            .use("pug-plain-loader")
            .loader("pug-plain-loader")
            .end()
            .use("vue-pug-loader")
            .loader("vue-pug-loader")
            .end()

        svgRule.uses.clear()
        svgRule.delete("type")
        svgRule.delete("generator")
        svgRule
            .use("vue-loader")
            .loader("vue-loader")
            .end()
            .use("vue-svg-loader")
            .loader("vue-svg-loader")
    },
})
