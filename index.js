import { scssOverride } from './configs/scss.js';
import { vueOverride } from './configs/vue.js';

/** @type {import('stylelint').Config} */
export default {
  extends: ['./configs/base.js'],
  overrides: [
    scssOverride,
    vueOverride,
  ],
};
