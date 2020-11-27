module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["<rootDir>/src/__tests__/files/"],
  // globalSetup: "./src/__tests__/config/setup.js",
  // globalTeardown: "./src/__tests__/config//teardown.js"
};
