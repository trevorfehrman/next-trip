module.exports = {
  moduleDirectories: ['.', 'node_modules'],
  moduleNameMapper: {
    '^.+\\.(scss|css)$': 'identity-obj-proxy',
  },
  modulePathIgnorePatterns: ['./cypress/e2e'],
};
