import { join } from "node:path";
import type { JestConfigWithTsJest } from "ts-jest";
import { jsWithTs } from "ts-jest/presets";

const jestConfig: JestConfigWithTsJest = {
  ...jsWithTs,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [join(__dirname, "./test/src/jest-setup.ts")],
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/test/"],
};

export default jestConfig;
