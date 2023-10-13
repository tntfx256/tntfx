import { kebabCase, pascalCase } from "@tntfx/core";
import { writeFileSync } from "fs";
import { join, parse } from "path";

const [command, ...args] = process.argv.slice(2);

if (command === "gen") {
  const [path, ...options] = args;

  const { name, dir } = parse(path);
  const noStyle = options.includes("--no-style");

  const componentName = pascalCase(name);
  const fileName = kebabCase(name);

  const styleImport = noStyle
    ? ""
    : `import "./${fileName}.scss";
`;
  const componentFileContent = `import type { PropsWithChildren } from "react";
${styleImport}
export type ${componentName}Props = {}

export function ${componentName}(props: PropsWithChildren<${componentName}Props>) {
  return <div className="${fileName}"></div>;
}
`;

  const scssFileContent = `@import "@tntfx/theme";

.${fileName} {
}
`;

  const destination = join(process.cwd(), dir, fileName);
  writeFileSync(`${destination}.tsx`, componentFileContent);
  if (!noStyle) {
    writeFileSync(`${destination}.scss`, scssFileContent);
  }
}
