module.exports = {
  extends: [
    '@circle-ng/eslint-config',
    // 'plugin:vue/vue3-recommended'
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
        tabWidth: 2,
        semi: true,
        singleQuote: true,
      },
      {
        usePrettierrc: false,
      },
    ],
    'no-use-before-define': 'off',
    'unicorn/consistent-function-scoping': 'off',
    'unicorn/expiring-todo-comments': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-process-exit': 'off',
    'unicorn/numeric-separators-style': 'off',
    'unicorn/prefer-top-level-await': 'off',
    'unicorn/switch-case-braces': 'off',
  },
};
