module.exports = {
  testEnvironment: 'node',
  testMatch: [
    '**/ocr-hash.test.js',
    '**/cv-geometry.test.js',
    '**/detectSquares.node.test.js',
    '**/app-logic.test.js',
    '**/domain-authority.test.js',
    '**/ui-state-machine.test.js'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/e2e/',
    '/_site/',
    '/test-results/'
  ],
  collectCoverageFrom: [
    '*.js',
    '!jest.config.js',
    '!webpack.config.js'
  ]
};
