import stylelint from 'stylelint';
import { describe, expect, it } from 'vitest';

import baseConfig from '../configs/base.js';
import config from '../index.js';
import scssConfig from '../configs/scss.js';
import vueConfig from '../configs/vue.js';

async function lint(code, codeFilename = 'test.css', lintConfig = config) {
  const result = await stylelint.lint({
    code,
    codeFilename,
    config: lintConfig,
  });

  return result.results[0].warnings;
}

function ruleNames(warnings) {
  return warnings.map((warning) => warning.rule);
}

function toRuleList(testCase) {
  return testCase.rules ?? [testCase.rule];
}

const invalidRuleCases = [
  {
    rule: 'block-no-empty',
    code: '.button {}\n',
  },
  {
    rule: 'alpha-value-notation',
    code: '.button { color: rgb(0 0 0 / 50%); }\n',
  },
  {
    rule: 'color-function-notation',
    code: '.button { color: rgb(0 0 0); }\n',
  },
  {
    rule: 'color-hex-length',
    code: '.button { color: #fff; }\n',
  },
  {
    rule: 'hue-degree-notation',
    code: '.button { color: hsl(0, 0%, 0%); }\n',
  },
  {
    rule: 'length-zero-no-unit',
    code: '.button { margin: 0px; }\n',
  },
  {
    rule: 'property-no-deprecated',
    code: '.button { clip: rect(0, 0, 0, 0); }\n',
  },
  {
    rule: 'media-type-no-deprecated',
    code: '@media tty { .button { color: #ffffff; } }\n',
  },
  {
    rule: 'declaration-block-no-redundant-longhand-properties',
    code: `
.button {
  margin-top: 1px;
  margin-right: 2px;
  margin-bottom: 3px;
  margin-left: 4px;
}
`,
  },
  {
    rule: 'rule-empty-line-before',
    code: `
.button {
  color: #ffffff;
}
.button__icon {
  color: #ffffff;
}
`,
  },
  {
    rule: 'max-nesting-depth',
    code: `
.a {
  .b {
    .c {
      .d {
        .e {
          .f {
            .g {
              .h {
                .i {
                  .j {
                    .k {
                      .l {
                        color: #ffffff;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`,
    codeFilename: 'component.scss',
  },
  {
    rule: 'value-keyword-case',
    code: '.button { display: BLOCK; }\n',
  },
  {
    rule: 'no-duplicate-selectors',
    code: `
.button {
  color: #ffffff;
}

.button {
  display: block;
}
`,
  },
  {
    rule: 'plugin/no-low-performance-animation-properties',
    code: '.button { transition: width 200ms ease; }\n',
  },
  {
    rule: 'plugin/declaration-block-no-ignored-properties',
    code: '.button { display: inline; width: 10px; }\n',
  },
  {
    rule: '@stylistic/indentation',
    code: '.button {\n    color: #ffffff;\n}\n',
  },
  {
    rule: '@stylistic/string-quotes',
    code: '.button::before { content: "label"; }\n',
  },
  {
    rule: '@stylistic/number-leading-zero',
    code: '.button { opacity: 0.5; }\n',
  },
  {
    rule: 'order/order',
    code: `
.button {
  color: #ffffff;
  --button-color: #000000;
}
`,
  },
  {
    rule: 'order/properties-order',
    code: `
.button {
  color: #ffffff;
  display: flex;
}
`,
  },
];

const validRuleCases = [
  {
    rule: 'custom-property-pattern',
    code: '.button { --Bad_Custom_Property: 1px; }\n',
  },
  {
    rule: 'font-family-no-missing-generic-family-keyword',
    code: '.button { font-family: Arial; }\n',
  },
  {
    rule: 'function-no-unknown',
    code: '.button { width: unknown-function(1px); }\n',
  },
  {
    rule: 'property-no-vendor-prefix',
    code: '.button { -webkit-transform: translateX(0); }\n',
  },
  {
    rule: 'selector-class-pattern',
    code: '.Bad_Class_Name { color: #ffffff; }\n',
  },
  {
    rule: 'selector-no-vendor-prefix',
    code: '.button::-webkit-input-placeholder { color: #ffffff; }\n',
  },
  {
    rule: 'selector-pseudo-class-no-unknown',
    code: '.button:deep(.icon) { color: #ffffff; }\n',
    codeFilename: 'component.vue',
  },
  {
    rule: 'selector-pseudo-element-no-unknown',
    code: '.button::v-deep { color: #ffffff; }\n',
    codeFilename: 'component.vue',
  },
  {
    rule: 'declaration-property-value-no-unknown',
    code: '.button { color: v-bind(buttonColor); }\n',
    codeFilename: 'component.vue',
  },
  {
    rule: 'declaration-block-no-redundant-longhand-properties',
    code: `
.button {
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
}
`,
  },
  {
    rule: 'value-keyword-case',
    code: '.button { fill: currentColor; color: v-bind(buttonColor); }\n',
    codeFilename: 'component.vue',
  },
  {
    rule: 'value-no-vendor-prefix',
    code: '.button { display: -webkit-flex; }\n',
  },
  {
    rule: 'no-empty-source',
    code: '',
  },
  {
    rule: 'no-descending-specificity',
    code: `
.button .icon {
  color: #ffffff;
}

.icon {
  color: #000000;
}
`,
  },
  {
    rule: 'no-invalid-position-declaration',
    code: '.button { position: static; top: 0; }\n',
  },
  {
    rule: 'block-no-redundant-nested-style-rules',
    code: `
.button {
  & {
    color: #ffffff;
  }
}
`,
  },
  {
    rule: 'nesting-selector-no-missing-scoping-root',
    code: `
.button {
  &__icon {
    color: #ffffff;
  }
}
`,
  },
  {
    rule: 'plugin/no-low-performance-animation-properties',
    code: '.button { transition: color 200ms ease; }\n',
  },
  {
    rule: '@stylistic/selector-list-comma-newline-after',
    code: '.button, .link { color: #ffffff; }\n',
  },
  {
    rule: '@stylistic/max-line-length',
    code: `.button { background-image: url('https://example.com/really-long-path/that-would-be-too-long-if-the-rule-were-enabled/image.png'); }\n`,
  },
  {
    rule: 'scss/at-extend-no-missing-placeholder',
    code: `
.button {
  @extend .shared-class;
}
`,
    codeFilename: 'component.scss',
  },
  {
    rule: 'scss/at-mixin-pattern',
    code: `
@mixin BadMixinName {
  color: #ffffff;
}
`,
    codeFilename: 'component.scss',
  },
  {
    rule: 'scss/at-function-pattern',
    code: `
@function BadFunctionName() {
  @return 1px;
}
`,
    codeFilename: 'component.scss',
  },
  {
    rule: 'scss/at-rule-no-unknown',
    code: `
@tailwind utilities;
`,
    codeFilename: 'component.scss',
  },
  {
    rule: 'scss/dollar-variable-pattern',
    code: '$Bad_Variable_Name: #ffffff;\n',
    codeFilename: 'component.scss',
  },
];

const coveredRuleNames = new Set([
  ...invalidRuleCases.flatMap(toRuleList),
  ...validRuleCases.flatMap(toRuleList),
]);

const configuredRuleNames = [
  ...Object.keys(baseConfig.rules),
  ...scssConfig.overrides.flatMap((override) => Object.keys(override.rules ?? {})),
  ...vueConfig.overrides.flatMap((override) => Object.keys(override.rules ?? {})),
];

describe('@rhapsodic/stylelint-config rules', () => {
  it.each(invalidRuleCases)('reports $rule', async (testCase) => {
    const warnings = await lint(testCase.code, testCase.codeFilename);

    expect(ruleNames(warnings)).toContain(testCase.rule);
  });

  it.each(validRuleCases)('allows $rule case', async (testCase) => {
    const warnings = await lint(testCase.code, testCase.codeFilename);

    for (const rule of toRuleList(testCase)) {
      expect(ruleNames(warnings)).not.toContain(rule);
    }
  });

  it('has an explicit test case for every configured rule', () => {
    const uncoveredRuleNames = configuredRuleNames.filter((rule) => !coveredRuleNames.has(rule));

    expect(uncoveredRuleNames).toEqual([]);
  });

  it('keeps Vue-specific allowances out of base', async () => {
    const warnings = await lint('.button:deep(.icon) { color: #ffffff; }\n', 'test.css', baseConfig);

    expect(ruleNames(warnings)).toContain('selector-pseudo-class-no-unknown');
  });

  it('allows SCSS-specific conventions in the SCSS preset', async () => {
    const warnings = await lint('$Bad_Variable_Name: #ffffff;\n', 'component.scss', scssConfig);

    expect(ruleNames(warnings)).not.toContain('scss/dollar-variable-pattern');
  });

  it('allows Vue-specific syntax in the Vue preset', async () => {
    const warnings = await lint('.button:deep(.icon) { color: v-bind(buttonColor); }\n', 'component.vue', vueConfig);

    expect(ruleNames(warnings)).not.toContain('selector-pseudo-class-no-unknown');
    expect(ruleNames(warnings)).not.toContain('declaration-property-value-no-unknown');
  });
});
