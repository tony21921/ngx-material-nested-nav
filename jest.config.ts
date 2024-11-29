import type { Config } from 'jest';

const jestConfig: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/.+/cypress/'],
  moduleNameMapper: {
    // '^@app/(.*)$': '<rootDir>/src/app/$1',
  //   '^.+\\.(html|scss)$': 'jest-transform-stub',
  // },
  // transform: {
  //   '^.+\\.(ts|js|html)$': 'jest-preset-angular',
  },
};

export default jestConfig;