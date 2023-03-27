module.exports = {
  extends: ['erb', 'plugin:import/errors', 'plugin:import/warnings', 'plugin:import/typescript'],
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'error',
    // Since React 17 and typescript 4.1 you can safely disable the rule
    'react/react-in-jsx-scope': 'off',
    'import/no-named-as-default': 'off',
    'no-return-await': 'off',
    '@typescript-eslint/return-await': 'off',
    singleAttributePerLine: 0,
    jsxSingleQuote: 0,
    'import/prefer-default-export': 'off',
    'max-len': 'off',
    'prettier/prettier': ['error', { printWidth: 130 }],
    objectPropertyNewline: 0,
    'react/jsx-props-no-spreading': 'off',
    'react/destructuring-assignment': 'off',
    'no-console': 0,
    'no-bitwise': 'off',
    'no-plusplus': 'off',

    'no-unused-prop-types': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    'no-nested-ternary': 'off',
    'promise/always-return': 'off',
    'no-useless-return': 'off',
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        controlComponents: ['BaseTextfield'],
        depth: 3,
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx'], moduleDirectory: ['node_modules', '.'] },
      webpack: {
        config: require.resolve('./.erb/configs/webpack.config.eslint.ts'),
      },
      typescript: {},
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};
