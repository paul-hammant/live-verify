const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Forbid defensive try-catch around require() or checking typeof require
      // If a dependency isn't available, the app should FAIL LOUDLY
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TryStatement:has(CallExpression[callee.name="require"])',
          message: 'Do not wrap require() in try-catch. If dependency is missing, fail loudly. Use CDN or proper bundling instead.',
        },
        {
          selector: 'IfStatement:has(BinaryExpression[operator="!=="][left.operator="typeof"][left.argument.name="require"])',
          message: 'Do not check if require is undefined. If dependency is missing, fail loudly. Use CDN or proper bundling instead.',
        },
        {
          selector: 'IfStatement:has(BinaryExpression[operator="!=="][right.operator="typeof"][right.argument.name="require"])',
          message: 'Do not check if require is undefined. If dependency is missing, fail loudly. Use CDN or proper bundling instead.',
        },
        {
          selector: 'LogicalExpression[operator="||"]:has(CallExpression[callee.name="require"])',
          message: 'Do not use || fallback with require(). If dependency is missing, fail loudly. Use CDN or proper bundling instead.',
        },
      ],
      // Also forbid console.warn about missing dependencies
      'no-console': ['warn', { allow: ['error', 'log'] }],
    },
  },
];
