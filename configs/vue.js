import baseConfig from './base.js';
import { scssRules } from './scss.js';

export const vueOverride = {
  files: [
    '**/*.{html,vue}',
  ],
  extends: [
    'stylelint-config-standard-scss',
  ],
  customSyntax: 'postcss-html',
  rules: {
    ...baseConfig.rules,
    ...scssRules,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'global', 'slotted'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted'],
      },
    ],
    'declaration-property-value-no-unknown': [
      true,
      {
        ignoreProperties: { '/.*/': String.raw`/v-bind\(.+\)/` },
      },
    ],
    'value-keyword-case': [
      'lower',
      {
        camelCaseSvgKeywords: true,
        ignoreFunctions: ['v-bind'],
      },
    ],
  },
};

/** @type {import('stylelint').Config} */
export default {
  extends: [
    baseConfig,
  ],
  overrides: [
    vueOverride,
  ],
};
