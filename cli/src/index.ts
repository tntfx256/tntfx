import { camelCase, kebabCase, pascalCase } from "@tntfx/core";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join, parse } from "path";
import { exec } from "./utils/cmd";
import { cliLogger } from "./utils/logger";

const [command, ...args] = process.argv.slice(2);

if (command === "gen") {
  const [type, ...options] = args;

  switch (type) {
    case "component":
      genComponent(options);
      break;
    case "project":
      genWorkspaceProject(options);
      break;
    default:
      throw new Error(`Unknown type ${type}`);
  }
}

function genComponent(args: string[]) {
  const [path, ...options] = args;

  const { name, dir } = parse(path);
  const noStyle = options.includes("--no-style");

  const componentName = pascalCase(name);
  const fileName = kebabCase(name);
  const variableName = camelCase(name);

  const styleImport = noStyle
    ? ""
    : `import "./${fileName}.scss";
`;
  const componentFileContent = `import type { PropsWithChildren } from "react";
${styleImport}
export type ${componentName}Props = {}

export function ${componentName}(props: PropsWithChildren<${componentName}Props>) {
return <div className="${variableName}"></div>;
}
`;

  const scssFileContent = `@use "@tntfx/theme";

.${variableName} {
  border: 1px solid theme.$color-border;
}
`;

  const destination = join(process.cwd(), dir, fileName);
  writeFileSync(`${destination}.tsx`, componentFileContent);
  if (!noStyle) {
    writeFileSync(`${destination}.scss`, scssFileContent);
  }
}

function genWorkspaceProject(args: string[]) {
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
    cliLogger.error(`Project ${projectName} already exists`);
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
    scripts: {},
    dependencies: {
      "@tntfx/core": "*",
    },
    devDependencies: {
      "@tntfx/tsconfig": "*",
    },
  };

  const tsconfig = {
    extends: "@tntfx/tsconfig/base.json",

    include: ["."],
  };

  writeFileSync(join(absolutePath, "index.ts"), `export const NAME = "";\n`);
  writeFileSync(join(absolutePath, "package.json"), JSON.stringify(packageJson, null, 2));
  writeFileSync(join(absolutePath, "tsconfig.json"), JSON.stringify(tsconfig, null, 2));

  exec(`yarn install`, { cwd: absolutePath, interactive: true });
  exec(`yarn add @types/node typescript --dev`, { cwd: absolutePath, interactive: true });
}
