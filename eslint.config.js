import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    rules: {
      // Customize rules as needed
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
];

