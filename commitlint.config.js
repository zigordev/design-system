// ESM, because package.json declares "type": "module" so that consumers
// importing the components get them treated as the ES modules they are.
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert'
      ]
    ],
    // Dependabot's grouped-update titles ("bump X and Y in the Z group
    // across N directories") routinely land past the conventional-commit
    // default of 100.
    'header-max-length': [2, 'always', 120]
  }
};
