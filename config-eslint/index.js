const { resolve, join } = require("node:path");
const { existsSync } = require("node:fs");

const cwd = process.cwd();

let projectPath = join(cwd, "tsconfig.json");
// tntfx/tsconfig.json
if (!existsSync(projectPath)) {
  projectPath = join(cwd, "../tsconfig.json");
}

const project = resolve(projectPath);

/** @type {import('eslint').ESLint.ConfigData} */
const esLintConfig = {
  extends: ["next/core-web-vitals", "turbo", "prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "simple-import-sort"],
  reportUnusedDisableDirectives: true,
  globals: {
    React: true,
  },
  parserOptions: {
    project,
    ecmaVersion: 2020,
    sourceType: "module",
    jsx: true,
    useJSXTextNode: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["node_modules/", ".next", ".swc", "dist/", ".eslintrc"],
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
