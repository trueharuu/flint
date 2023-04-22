/** @type {import('@types/eslint').Linter.Config} */
module.exports = {
  extends: ['plugin:@typescript-eslint/base'],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  // ignorePatterns: ".eslintrc.js",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname
  },
  root: true,
  rules: {
    '@typescript-eslint/adjacent-overload-signatures': 'warn',
    '@typescript-eslint/array-type': [
      'warn',
      {
        default: 'generic',
        readonly: 'generic'
      }
    ],
    '@typescript-eslint/await-thenable': 'warn',
    '@typescript-eslint/ban-ts-comment': [
      'warn',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': true,
        'ts-nocheck': true,
        'ts-check': false,
        minimumDescriptionLength: 10
      }
    ],
    '@typescript-eslint/ban-tslint-comment': 'warn',
    '@typescript-eslint/ban-types': [
      'warn',
      {
        types: {
          String: {
            message:
              '`String` represents the class box for `string` primitive. Use `string` instead.',
            fixWith: 'string'
          },

          Boolean: {
            message:
              '`Boolean` is the class for `boolean` primitive. Use `boolean` instead.',
            fixWith: 'boolean'
          },

          Number: {
            message:
              '`Number` is the class for `number` primitive. Use `number` instead.',
            fixWith: 'number'
          },

          BigInt: {
            message:
              '`BigInt` is the class for `bigint` primitive. Use `bigint` instead.',
            fixWith: 'bigint'
          },

          Object: {
            message:
              '`Object` is used in every type except `null`.\n\tnote: if you mean \'any object\', then use `object`.\n\tnote: if you mean \'any value\', then use `unknown`.'
          },

          '{}': {
            message:
              '`{}` is equivalent to `Object`, which is used in every type except `null`.\n\tnote: if you mean \'any object\', then use `object`.\n\tnote: if you mean \'any value\', then use `unknown`.\n\tif you mean \'empty object\', then use `Record<never, never>`'
          }
        }
      }
    ],
    '@typescript-eslint/class-literal-property-style': ['warn', 'fields'],
    '@typescript-eslint/consistent-generic-constructors': [
      'warn',
      'constructor'
    ],
    '@typescript-eslint/consistent-indexed-object-style': ['warn', 'record'],
    '@typescript-eslint/consistent-type-assertions': [
      'warn',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow-as-parameter'
      }
    ],
    '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
    '@typescript-eslint/consistent-type-exports': 'warn',
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        disallowTypeAnnotations: true
      }
    ],
    '@typescript-eslint/explicit-function-return-type': ['warn'],
    '@typescript-eslint/explicit-member-accessibility': [
      'warn',
      {
        accesibility: 'explicit'
      }
    ],
    '@typescript-eslint/member-ordering': [
      'warn',
      {
        default: {
          memberTypes: ['field', 'get', 'set', 'method'],
          order: 'natural'
        }
      }
    ],
    '@typescript-eslint/method-signature-style': ['warn', 'property'],
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        format: ['strictCamelCase'],
        selector: [
          'variable',
          'function',
          'parameter',
          'classProperty',
          'parameterProperty',
          'classMethod',
          'accessor'
        ]
      },
      {
        format: ['StrictPascalCase'],
        selector: ['enumMember', 'class', 'interface', 'typeAlias', 'enum']
      },
      {
        format: ['UPPER_CASE'],
        selector: ['typeParameter']
      }
    ],
    '@typescript-eslint/no-base-to-string': 'warn',
    '@typescript-eslint/no-confusing-non-null-assertion': 'warn',
    '@typescript-eslint/no-confusing-void-expression': 'warn',
    '@typescript-eslint/no-duplicate-enum-values': 'warn',
    '@typescript-eslint/no-dynamic-delete': 'warn',
    '@typescript-eslint/no-empty-interface': [
      'warn',
      { allowSingleExtends: true }
    ],
    '@typescript-eslint/no-explicit-any': ['warn', { fixToUnknown: true }],
    '@typescript-eslint/no-extra-non-null-assertion': 'warn',
    '@typescript-eslint/no-extraneous-class': 'warn',
    '@typescript-eslint/no-floating-promises': ['warn', { ignoreIIFE: true }],
    '@typescript-eslint/no-for-in-array': 'warn',
    '@typescript-eslint/no-import-type-side-effects': 'warn',
    '@typescript-eslint/no-invalid-void-type': 'warn',
    '@typescript-eslint/no-meaningless-void-operator': [
      'warn',
      { checkNever: true }
    ],
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-mixed-enums': 'warn',
    '@typescript-eslint/no-namespace': ['off'],
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'warn',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/no-redundant-type-constituents': 'warn',
    '@typescript-eslint/no-require-imports': 'warn',
    '@typescript-eslint/no-this-alias': ['off'],
    '@typescript-eslint/no-type-alias': [
      'warn',
      {
        allowAliases: 'in-unions-and-intersections', // type Foo =
        allowCallbacks: 'always', // type Foo = (x: Y) => T
        allowConditionalTypes: 'always', // type Foo<T> = T extends U ? W : Z
        allowConstructors: 'always', // type Foo = new (x: Y) => T
        allowLiterals: 'always', // type Foo = 1
        allowMappedTypes: 'always', // type Foo<T extends PropertyKey> = { [P in T]: unknown }
        allowTupleTypes: 'always', // type Foo = [Bar, Qux]
        allowGenerics: 'always' // type Foo = Bar<T>
      }
    ],
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
    '@typescript-eslint/no-unnecessary-condition': [
      'warn',
      { allowConstantLoopConditions: true }
    ],
    '@typescript-eslint/no-unnecessary-qualifier': 'warn',
    '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
    '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
    '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
    // #[forbid(unsafe)]
    '@typescript-eslint/no-unsafe-argument': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unsafe-declaration-merging': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/no-unsafe-return': 'warn',

    '@typescript-eslint/no-useless-empty-export': 'warn',
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/parameter-properties': [
      'warn',
      { prefer: 'parameter-property' }
    ],
    '@typescript-eslint/prefer-as-const': 'warn',
    // #[forbid(enum_hole)]
    '@typescript-eslint/prefer-enum-initializers': 'warn',
    '@typescript-eslint/prefer-for-of': 'warn',
    '@typescript-eslint/prefer-function-type': 'warn',
    '@typescript-eslint/prefer-includes': 'warn',
    '@typescript-eslint/prefer-literal-enum-member': [
      'warn',
      { allowBitwiseExpressions: true }
    ],
    '@typescript-eslint/prefer-namespace-keyword': 'warn',
    '@typescript-eslint/prefer-optional-chain': 'warn',
    '@typescript-eslint/prefer-readonly': 'warn',
    '@typescript-eslint/prefer-reduce-type-parameter': 'warn',
    '@typescript-eslint/prefer-regexp-exec': 'warn',
    '@typescript-eslint/prefer-return-this-type': 'warn',
    '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
    '@typescript-eslint/prefer-ts-expect-error': 'warn',
    '@typescript-eslint/promise-function-async': 'warn',
    '@typescript-eslint/require-array-sort-compare': [
      'warn',
      { ignoreStringArrays: true }
    ],
    '@typescript-eslint/restrict-plus-operands': [
      'warn',
      { checkCompoundAssignments: true, allowAny: false }
    ],
    '@typescript-eslint/restrict-template-expressions': [
      'warn',
      { allowNumber: true, allowBoolean: true, allowRegExp: true }
    ],
    '@typescript-eslint/sort-type-constituents': 'warn',
    '@typescript-eslint/strict-boolean-expressions': [
      'warn',
      {
        allowString: false,
        allowNumber: false,
        allowNullableObject: true,
        allowNullableBoolean: true,
        allowNullableString: true,
        allowNullableNumber: true,
        allowNullableEnum: true,
        allowAny: false,
        allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false
      }
    ],
    '@typescript-eslint/switch-exhaustiveness-check': 'warn',
    '@typescript-eslint/triple-slash-reference': 'warn',
    '@typescript-eslint/typedef': [
      'warn',
      {
        arrowParameter: false,
        variableDeclaration: true,
        parameter: true,
        memberVariableDeclaration: true,
        variableDeclarationIgnoreFunction: true
      }
    ],
    '@typescript-eslint/unbound-method': 'warn',
    '@typescript-eslint/unified-signatures': 'warn',

    // ::EXTENSIONS

    'default-param-last': 'off',
    '@typescript-eslint/default-param-last': 'warn',

    'dot-notation': 'off',
    '@typescript-eslint/dot-notation': ['warn', { allowKeywords: true }],

    'init-declarations': 'off',
    '@typescript-eslint/init-declarations': ['warn', 'always'],

    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': 'warn',

    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': 'warn',

    'no-extra-semi': 'off',
    '@typescript-eslint/no-extra-semi': 'warn',

    'no-implied-eval': 'off',
    '@typescript-eslint/no-implied-eval': 'error',

    'no-invalid-this': 'off',
    '@typescript-eslint/no-invalid-this': ['warn', { capIsConstructor: false }],

    'no-loop-func': 'off',
    '@typescript-eslint/no-loop-func': 'warn',

    'no-loss-of-precision': 'off',
    '@typescript-eslint/no-loss-of-precision': 'warn',

    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'off',

    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'off',

    'no-throw-literal': 'off',
    '@typescript-eslint/no-throw-literal': 'warn',

    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'warn',

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'warn',
      {
        functions: false,
        classes: true,
        variables: true,
        allowNamedExports: false,
        enums: true,
        typedefs: false,
        ignoreTypeReferences: true
      }
    ],

    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'warn',

    'require-await': 'off',
    '@typescript-eslint/require-await': 'warn',

    'no-return-await': 'off',
    '@typescript-eslint/return-await': ['warn', 'always'],

    'block-spacing': 'off',
    '@typescript-eslint/block-spacing': 'warn',

    'brace-style': 'off',
    '@typescript-eslint/brace-style': 'warn',

    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': 'warn',

    'comma-spacing': 'off',
    '@typescript-eslint/comma-spacing': 'warn',

    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': 'warn',

    // ident: ["warn", 2],

    'key-spacing': 'off',
    '@typescript-eslint/key-spacing': 'warn',

    'keyword-spacing': 'off',
    '@typescript-eslint/keyword-spacing': 'warn',

    'lines-between-class-members': 'off',
    '@typescript-eslint/lines-between-class-members': 'warn',

    '@typescript-eslint/member-delimiter-style': 'warn',

    'no-extra-parens': 'off',
    '@typescript-eslint/no-extra-parens': 'warn',

    'object-curly-spacing': 'off',
    '@typescript-eslint/object-curly-spacing': ['warn', 'always'],

    quotes: 'off',
    '@typescript-eslint/quotes': ['warn', 'single'],

    semi: 'off',
    '@typescript-eslint/semi': ['warn', 'always'],

    'space-before-blocks': 'off',
    '@typescript-eslint/space-before-blocks': 'warn',

    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': [
      'warn',
      { anonymous: 'always', named: 'never', asyncArrow: 'always' }
    ],

    'space-infix-ops': 'off',
    '@typescript-eslint/space-infix-ops': 'warn',

    '@typescript-eslint/type-annotation-spacing': 'warn'
  }
};
