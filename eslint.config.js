// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';

const compat = new FlatCompat({
  baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
});

export default [{
  ignores: [
    'dist/**',
    'node_modules/**',
    'public/**',
    '**/*.min.js',
    '**/*.config.js',
    '.eslintrc.cjs',
  ],
}, ...compat.extends('airbnb', 'airbnb/hooks'), {
  files: ['src/**/*.{js,jsx}', 'setupTests.js'],
  languageOptions: {
    globals: globals.browser,
    ecmaVersion: 'latest',
    sourceType: 'module',
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx'] }],
    'linebreak-style': 'off',
    'no-alert': 'off',
    'no-param-reassign': ['error', { props: false }],
    'import/no-extraneous-dependencies': 'off',
  },
}, ...storybook.configs["flat/recommended"]];
