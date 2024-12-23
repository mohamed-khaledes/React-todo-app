// jest.config.js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Ensure Babel is used for JSX and JS files
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Adjust this based on your project structure
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
