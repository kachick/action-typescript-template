import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      'esbuild-jest-transform',
      {
        'target': 'node20',
        'packages': 'external',
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts'],
  testMatch: ['**/**/*.test.ts'],
};
module.exports = config;
