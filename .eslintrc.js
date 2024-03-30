module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "plugin:prettier/recommended",
    ],
    parserOptions: {
        parser: "@babel/eslint-parser",
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        semi: ["error", "never"],
        indent: ["error", 4],
    },
    overrides: [
        {
            files: [
                "**/__tests__/*.{j,t}s?(x)",
                "**/tests/unit/**/*.spec.{j,t}s?(x)",
            ],
            env: {
                jest: true,
            },
        },
    ],
}
