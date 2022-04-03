module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        'plugin:@typescript-eslint/recommended',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "object-curly-spacing": "off",
        "@typescript-eslint/object-curly-spacing": ["error", "always"],
        "@typescript-eslint/keyword-spacing": ["error", { "after": true }],
        "@typescript-eslint/space-infix-ops": ["error", { "int32Hint": false }],
        "@typescript-eslint/semi": ["error"],
        "@typescript-eslint/typedef": ["error", {
            "parameter": true
        }],
        "@typescript-eslint/quotes": ["error", "double"],
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/object-curly-spacing": ["error", "always"],
        "eqeqeq": ["error", "always", { "null": "ignore" }],
        "no-trailing-spaces": "error",
        "no-multi-spaces": "error",
        "no-multiple-empty-lines": ["error", { "max": 1 }],
        "max-classes-per-file": "error",
        "quote-props": ["error", "consistent-as-needed"],
        "object-shorthand": ["error", "properties"],
        "eol-last": ["error", "always"]
    },
};