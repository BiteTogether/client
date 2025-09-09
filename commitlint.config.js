export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-pattern': [
      2,
      'always',
      /^\[[a-zA-Z0-9_-]+\] (Add|Update|Fix|Refactor|Remove) .+$/
    ],
    'header-match-team-convention': [
      2,
      'always',
      (parsed) => {
        // Check for [context] Verb message
        return /^\[[a-zA-Z0-9_-]+\] (Add|Update|Fix|Refactor|Remove) .+$/.test(parsed.header);
      }
    ],
  },
};
