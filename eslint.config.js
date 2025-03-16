import globals from 'globals';
import fp from 'eslint-plugin-fp';

import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname, recommendedConfig: pluginJs.configs.recommended });

export default [
  { languageOptions: { globals: globals.node } },
  ...compat.extends('airbnb-base'),
  {
    plugins: {
      fp,
    },
    rules: {
      'max-len': ['error', { code: 100 }],
      'object-curly-spacing': ['error', 'always'],
      'no-console': 0,
      'import/extensions': 0,
      'fp/no-arguments': 'error',
      'fp/no-class': 'error',
      'fp/no-delete': 'error',
      'fp/no-events': 'error',
      'fp/no-get-set': 'error',
      'fp/no-let': 'error',
      'fp/no-loops': 'error',
      'fp/no-mutating-assign': 'error',
      'fp/no-mutating-methods': 'error',
      'fp/no-mutation': 'error',
      // 'fp/no-nil': 'error',
      'fp/no-proxy': 'error',
      'fp/no-rest-parameters': 'error',
      'fp/no-this': 'error',
      // 'fp/no-throw': 'error',
      // 'fp/no-unused-expression': 'error',
      'fp/no-valueof-field': 'error',
      'no-var': 'error',
      'no-underscore-dangle': [2, { allow: ['__filename', '__dirname'] }],
    },
  },
];
