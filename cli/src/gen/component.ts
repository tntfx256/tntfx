import { writeFileSync } from "node:fs";
import { join, parse } from "path";
import { kebabCase, pascalCase } from "../utils/helpers";

export function genComponent(args: string[]) {
  const [root, path, ...options] = args;

  const { name, dir } = parse(join(root, path));
  const noStyle = options.includes("--no-style");

  const componentName = pascalCase(name);
  const fileName = kebabCase(name);

  const componentWithoutStyle = `import type { Props } from "@tntfx/core";

export type ${componentName}Props = Props & {}

export function ${componentName}(props: ${componentName}Props) {
  const {} = props;

  return <div></div>;
}
`;

  const componentWithStyle = `import type { Props } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { useStyle } from "./${fileName}.style";

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
  writeFileSync(`${destination}.tsx`, noStyle ? componentWithoutStyle : componentWithStyle);
  if (!noStyle) {
    writeFileSync(`${destination}.style.ts`, styleFileContent);
  }
}
