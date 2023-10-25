/** @type {import('eslint').ESLint.ConfigData} */
const esLintConfig = {
  extends: ["next/core-web-vitals", "turbo", "prettier", "plugin:@tanstack/eslint-plugin-query/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "simple-import-sort", "@tanstack/query"],
  reportUnusedDisableDirectives: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    jsx: true,
    useJSXTextNode: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",

    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/prefer-for-of": "warn",

    "@tanstack/query/exhaustive-deps": "warn",

    "import/first": "warn",
    "import/newline-after-import": "warn",
    "import/no-duplicates": "warn",

    "react-hooks/exhaustive-deps": "warn",
    "no-unused-vars": "off",

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
  },
};

module.exports = esLintConfig;
