import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';


export default [
  {files: ['./src/**/*.ts']},
  {rules: { semi: 'error', quotes: ['error','single']}},
  {languageOptions: { globals: globals.commonjs }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];