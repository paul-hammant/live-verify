module.exports = {
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.test.js'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/e2e/',
    '/_site/',
    '/test-results/',
    'ocr-hash-image.test.js' // Requires 'sharp' package - excluded for now
  ],
  collectCoverageFrom: [
    'public/**/*.js',
    '!public/cv/opencv.js',
    '!jest.config.js',
    '!webpack.config.js'
  ]
};
