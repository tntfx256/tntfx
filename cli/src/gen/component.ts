import { writeFileSync } from "fs";
import { join, parse } from "path";
import { kebabCase, pascalCase } from "../utils/helpers";

export function genComponent(args: string[]) {
  const [root, path, ...options] = args;

  const { name, dir } = parse(join(root, path));
  const noStyle = options.includes("--no-style");

  const componentName = pascalCase(name);
  const fileName = kebabCase(name);

  const styleImport = noStyle ? "" : `import { useStyle } from "./${fileName}.style";`;
  const componentFileContent = `import type { Props } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
${styleImport}

export type ${componentName}Props = Props & {}

export function ${componentName}(props: ${componentName}Props) {
  const { className, ...libProps } = props;
  const style = useStyle();

return <div className={classNames(style.root, className)} {...libProps}></div>;
}
`;

  const styleFileContent = `import { Style } from "@tntfx/theme";

export const useStyle = Style.create({
  root: {}
});
`;

  const destination = join(process.cwd(), dir, fileName);
  writeFileSync(`${destination}.tsx`, componentFileContent);
  if (!noStyle) {
    writeFileSync(`${destination}.style.ts`, styleFileContent);
  }
}
