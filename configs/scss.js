import baseConfig from './base.js';

export const scssRules = {
  'at-rule-empty-line-before': [
    'always',
    {
      except: ['blockless-after-same-name-blockless', 'first-nested'],
      ignore: ['after-comment'],
      ignoreAtRules: ['else', 'extend', 'forward', 'function', 'if', 'include', 'mixin', 'return', 'use'],
    },
  ],
  'at-rule-no-unknown': null,
  'scss/at-extend-no-missing-placeholder': null,
  'scss/at-mixin-pattern': null,
  'scss/at-function-pattern': null,
  'scss/at-rule-no-unknown': null,
  'scss/dollar-variable-pattern': null,
};

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
    ...scssRules,
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
