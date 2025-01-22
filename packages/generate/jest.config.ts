
import type {Config} from 'jest';

const jestConfig:Config = {
  // clearMocks: true,
  // transform: {
  //   '^.+\\.(ts|tsx|js|jsx)$': [
  //     'ts-jest',
  //     {
  //       tsconfig: 'tsconfig.json',
  //     },
  //   ],
  // },
  // transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  // moduleNameMapper: {
  //   '^nanoid(/(.*)|$)': 'nanoid$1',
  // },
  testMatch: ['<rootDir>/src/test/?(*.)test.ts(x|)'],
  preset: 'ts-jest',
  testEnvironment: "node",
}

export default jestConfig;
