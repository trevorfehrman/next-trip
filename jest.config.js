module.exports = {
  moduleDirectories: ['.', 'node_modules'],
  moduleNameMapper: {
    '^.+\\.scss$': 'identity-obj-proxy',
  },
  modulePathIgnorePatterns: ['./cypress/e2e'],
};
