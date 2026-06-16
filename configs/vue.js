import baseConfig from './base.js';

export const vueOverride = {
  files: [
    '**/*.{html,vue}',
  ],
  customSyntax: 'postcss-html',
  rules: {
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
