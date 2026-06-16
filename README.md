# Rhapsodic Stylelint Config

[![npm version][npm-image]][npm-url] [![npm downloads][downloads-image]][downloads-url] [![License][license-image]][license-url] [![CI Status][ci-image]][ci-url]

> The shared Stylelint config for Rhapsodic projects.

Use it to lint CSS, SCSS, Vue, and HTML styles with the same rules across projects. To see the rules that this config uses, please read the [configs](./configs).

## Installation and usage

Add `@rhapsodic/stylelint-config` and `stylelint` itself to your project:

```shell
pnpm add -D @rhapsodic/stylelint-config stylelint
```

Requires Stylelint 17.

Set your `stylelint.config.js` to:

```js
/** @type {import('stylelint').Config} */
export default {
  extends: ['@rhapsodic/stylelint-config'],
};
```

Add a lint script:

```json
{
  "scripts": {
    "lint:style": "stylelint \"**/*.{css,scss,vue,html}\""
  }
}
```

## Presets

The default preset includes base CSS rules, SCSS support, and Vue/HTML support:

```js
/** @type {import('stylelint').Config} */
export default {
  extends: ['@rhapsodic/stylelint-config'],
};
```

You can choose a smaller preset if a project does not use SCSS or Vue:

```js
/** @type {import('stylelint').Config} */
export default {
  extends: ['@rhapsodic/stylelint-config/base'],
};
```

```js
/** @type {import('stylelint').Config} */
export default {
  extends: ['@rhapsodic/stylelint-config/scss'],
};
```

```js
/** @type {import('stylelint').Config} */
export default {
  extends: ['@rhapsodic/stylelint-config/vue'],
};
```

## Rule overrides

If the value of a rule does not suit you, specify that rule in the `rules` section with the value you want:

```js
/** @type {import('stylelint').Config} */
export default {
  extends: ['@rhapsodic/stylelint-config'],
  rules: {
    '@stylistic/indentation': 'tab',
  },
};
```

You can turn off rules by setting their value to `null`.

For example:

```js
/** @type {import('stylelint').Config} */
export default {
  extends: ['@rhapsodic/stylelint-config'],
  rules: {
    '@stylistic/max-line-length': null,
  },
};
```

Please refer to [Stylelint docs](https://stylelint.io/user-guide/get-started) for detailed info on using this linter.

## License

[MIT License](./LICENSE)

[license-url]: https://github.com/rhapsodic-dev/stylelint-config/blob/master/LICENSE
[license-image]: https://img.shields.io/npm/l/@rhapsodic/stylelint-config?style=flat&colorA=020420&colorB=00DC82
[npm-url]: https://npmjs.org/package/@rhapsodic/stylelint-config
[npm-image]: https://img.shields.io/npm/v/@rhapsodic/stylelint-config/latest.svg?style=flat&colorA=020420&colorB=00DC82
[downloads-url]: https://npm.chart.dev/@rhapsodic/stylelint-config
[downloads-image]: https://img.shields.io/npm/dm/@rhapsodic/stylelint-config?style=flat&colorA=020420&colorB=00DC82
[ci-url]: https://github.com/rhapsodic-dev/stylelint-config/actions
[ci-image]: https://img.shields.io/github/actions/workflow/status/rhapsodic-dev/stylelint-config/ci.yml?branch=master&style=flat&colorA=020420&colorB=00DC82
