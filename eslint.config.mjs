import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  {
    // Configurações globais
    prettierRecommended,
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        browser: true,
        es2021: true,
        jest: true,
        window: true,
        document: true,
        console: true,
        module: true,
        require: true,
        process: true,
        __dirname: true,
        __filename: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      'jsx-a11y': jsxA11y,
       prettier: prettierPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescript.configs.recommended.rules,
      ...prettierConfig.rules, // <-- desativa regras que conflitam com Prettier
      'no-undef': 'off',
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      // Regras de acessibilidade
      'jsx-a11y/alt-text': [
        'warn',
        {
          elements: ['img'],
          img: ['Image'],
        },
      ],
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-proptypes': 'warn',
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    // Arquivos ignorados
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'node_modules/**',
      'dist/**',
    ],
  },
]);
