import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join, parse } from "path";
import { exec } from "../utils/cmd";
import { kebabCase } from "../utils/helpers";

export function genWorkspaceProject(args: string[]) {
  const [path] = args;

  let [basePath, packageName] = path.split("@");
  let scope = "";
  let projectName = "";

  if (packageName) {
    [scope, projectName] = packageName.split("/").map((s) => kebabCase(s));
  }

  if (!projectName) {
    const { name, dir } = parse(path);
    projectName = name;
    basePath = dir;
  }
  const absolutePath = join(process.cwd(), basePath, projectName);

  if (existsSync(absolutePath)) {
    console.error(`Project ${projectName} already exists`);
    return;
  }

  mkdirSync(absolutePath, { recursive: true });
  mkdirSync(join(absolutePath, "src"));

  const ws = scope ? `@${scope}/${projectName}` : projectName;
  const packageJson = {
    name: ws,
    private: true,
    version: "0.0.0",
    main: "./index.ts",
    types: "./index.ts",
    scripts: {
      lint: 'npx eslint "src/**/*.{ts,tsx}" --fix',
      types: "tsc -p tsconfig.json --noEmit",
    },
    dependencies: {
      "@tntfx/core": "workspace:*",
    },
    devDependencies: {
      "@tntfx/eslint-config": "workspace:*",
      "@tntfx/tsconfig": "workspace:*",
    },
  };

  const tsconfig = {
    extends: "@tntfx/tsconfig/react.json",

    include: ["src"],
  };

  writeFileSync(join(absolutePath, "index.ts"), `export const NAME = "";\n`);
  writeFileSync(join(absolutePath, "package.json"), JSON.stringify(packageJson, null, 2));
  writeFileSync(join(absolutePath, "tsconfig.json"), JSON.stringify(tsconfig, null, 2));

  exec(`yarn install`, { cwd: absolutePath, interactive: true });
  exec(`yarn add --dev @types/node typescript --dev`, { cwd: absolutePath, interactive: true });
}
