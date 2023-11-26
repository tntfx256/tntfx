/** @type {import('eslint').ESLint.ConfigData} */
const esLintConfig = {
  root: true,
  extends: ["next/core-web-vitals", "turbo", "prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "simple-import-sort", "tsdoc"],
  reportUnusedDisableDirectives: true,
  globals: {
    React: true,
  },
  parserOptions: {
    // project,
    ecmaVersion: 2020,
    sourceType: "module",
    jsx: true,
    useJSXTextNode: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        // project,
      },
    },
    react: {
      version: "detect",
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",

    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/prefer-for-of": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",

    "import/first": "warn",
    "import/newline-after-import": "warn",
    "import/no-duplicates": "warn",
    "import/no-default-export": "off",

    "react-hooks/exhaustive-deps": "warn",
    "no-unused-vars": "off",

    "react/jsx-curly-brace-presence": "warn",
    "react/jsx-key": "warn",
    "react/jsx-sort-props": [
      "warn",
      {
        callbacksLast: true,
        multiline: "last",
        reservedFirst: ["key"],
        shorthandFirst: true,
      },
    ],

    "simple-import-sort/exports": "warn",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [["^react", "^next", "^@?\\w", "^@/", "^\\./", "^\\.\\./", ".s?css$"]],
      },
    ],

    "turbo/no-undeclared-env-vars": "warn",

    "tsdoc/syntax": "warn",
  },
};

module.exports = esLintConfig;
