module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEach: ["<rootDir>/test/jest.setup.ts"],
  testMatch: ["**/test/**/*.test.ts"],
  collectCoverageFrom: ["src/**/*.ts", "!src/server.ts"],
  coverageDirectory: "coverage",
};