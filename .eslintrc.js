//https://eslint.org/docs/user-guide/configuring
module.exports = {
    root: true,
    extends: ["eslint-config-mfe/eslintrc.es6.js"],
    rules: {
        quotes: "off",
        "node/no-unsupported-features/es-syntax": "off",
    },
};
