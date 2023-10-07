/** @type {import('stylelint').Config} */
const esLintConfig = {
  defaultSeverity: "warning",

  extends: ["stylelint-config-recommended-scss", "stylelint-config-idiomatic-order"],

  plugins: ["stylelint-order"],

  reportInvalidScopeDisables: true,

  rules: {
    "custom-property-empty-line-before": null,
    "selector-id-pattern": null,

    "property-no-vendor-prefix": null,
    "value-keyword-case": null,
  },
};

module.exports = esLintConfig;
