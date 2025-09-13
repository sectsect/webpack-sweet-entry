module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
    jquery: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // "ecmaVersion": 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'eslint-plugin-tsdoc', '@vitest'],
  rules: {
    'func-names': 0,
    'import/extensions': 0,
    // "import/extensions": ["error", "always", {
    //     "js": "never",
    //     "jsx": "never",
    //     "ts": "never",
    //     "tsx": "never"
    // }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
      },
    ],
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'no-alert': 0,
    'no-console': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'class',
        format: ['PascalCase'],
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
        // custom: {
        //   regex: "^I[A-Z]",
        //   match: false
        // }
      },
      {
        selector: 'enum',
        format: ['PascalCase'],
      },
    ],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    'prettier/prettier': 'error',
    'tsdoc/syntax': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/extensions': ['.js', '.jsx', '.json', '.ts', '.tsx'],
    // "import/resolver": {
    //   "webpack": {
    //     "config": "webpack.config.js"
    //   }
    // }
  },
  overrides: [
    {
      files: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
      plugins: ['@vitest'],
      rules: {
        '@vitest/consistent-test-it': 'error',
        '@vitest/no-conditional-expect': 'error',
        '@vitest/no-conditional-in-test': 'error',
        '@vitest/no-conditional-tests': 'error',
        '@vitest/no-disabled-tests': 'warn',
        '@vitest/no-focused-tests': 'error',
        '@vitest/prefer-to-be': 'error',
        '@vitest/prefer-to-contain': 'error',
        '@vitest/prefer-to-have-length': 'error',
        '@vitest/valid-describe-callback': 'error',
        '@vitest/valid-expect': 'error',
      },
      env: {
        node: true,
      },
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        test: 'readonly',
      },
    },
  ],
};
