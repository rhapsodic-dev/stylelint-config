import baseConfig from './base.js';

export const scssOverride = {
  files: [
    '**/*.scss',
  ],
  extends: [
    'stylelint-config-standard-scss',
  ],
  customSyntax: 'postcss-scss',
  rules: {
    ...baseConfig.rules,
    'scss/at-extend-no-missing-placeholder': null,
    'scss/at-mixin-pattern': null,
    'scss/at-function-pattern': null,
    'scss/at-rule-no-unknown': null,
    'scss/dollar-variable-pattern': null,
  },
};

/** @type {import('stylelint').Config} */
export default {
  extends: [
    baseConfig,
  ],
  overrides: [
    scssOverride,
  ],
};
