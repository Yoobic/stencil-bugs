'use strict';

module.exports = {
  globals: {
    'ts-jest': { tsConfigFile: 'test/tsconfig.spec.json'},
    __TRANSFORM_HTML__: true
  },
  //preset: 'jest-preset-angular',
  setupTestFrameworkScriptFile: '<rootDir>/test/setupJest.ts',
  verbose: true,

  setupFiles: [
    'jsdom-worker', 'jest-canvas-mock'
  ],

  modulePathIgnorePatterns: [
    '<rootDir>\/projects.*@angular\/.*',
    '<rootDir>\/design-system\/doc\/.*',
    '<rootDir>\/design-system\/stencil\/dist\/.*',
  ],
  transform: {
    '^.+\\.(ts|js|html)$': '<rootDir>/node_modules/jest-preset-angular/preprocessor.js',
    '^.+\\.(ts|tsx)$': '<rootDir>/node_modules/@stencil/core/testing/jest.preprocessor.js'
  },

  testMatch: [
    '<rootDir>/projects/**/*.spec.ts',
    '<rootDir>/shared/**/*.spec.ts',
    '<rootDir>/design-system/**/*.spec.ts'
  ],

  testPathIgnorePatterns: [
    '/node_modules/',
    '/plugins/',
    '/platforms/',
    '/dist/',
    '/bin/',
    '/doc/',
    '/www/',
    '/node_modules_cordova/'
  ],
  //testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|js)$',
  moduleFileExtensions: [
    'ts',
    'js',
    'html',
    'json',
    'tsx',
    'jsx'
  ],
  moduleNameMapper: {
    // '^@angular\/(.*)': '<rootDir>/node_modules/@angular/$1',
     '^test\/(.*)': '<rootDir>/test/$1'
  },
  transformIgnorePatterns: [
    'node_modules/(?!@ngrx|@ngrx-translate|@shared|ionic-angular|@ionic-native|@angular/common/locales|lodash-es)'
  ],
  testEnvironmentOptions: {url: 'https://www.example.com'}//,
  //reporters: process.env.CI ? ['jest-dot-reporter'] : ['default']
};