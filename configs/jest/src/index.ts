import type { DeepPartial } from "@tntfx/core";
import { join } from "path";
import { type JestConfigWithTsJest } from "ts-jest";

export function createJestConfig(config: DeepPartial<JestConfigWithTsJest> = {}) {
  const finalConfig = {
    globals: {
      "ts-jest": {
        tsconfig: join(process.cwd(), "tsconfig.json"),
      },
    },
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: [join(__dirname, "setup-jest.ts")],
    ...config,
  };

  return finalConfig;
}
