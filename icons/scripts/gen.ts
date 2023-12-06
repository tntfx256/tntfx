import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const source = join(__dirname, "../../../node_modules/@fluentui/react-icons/lib/sizedIcons");
const dest = join(__dirname, "../src/icons-list.tsx");

if (!existsSync(source)) {
  throw new Error("Source folder not found");
}

const files = readdirSync(source).filter((file) => file.endsWith(".js"));

const imports: string[] = [];
const map: string[] = [];
const cache: Record<string, string[]> = {};

for (const file of files) {
  const content = readFileSync(join(source, file), "utf-8");

  const regex = /createFluentIcon\('(.+)(\d\d)Regular'/g;
  const matches = content.matchAll(regex);
  if (matches) {
    for (const match of matches) {
      const icon = match[1];
      const size = match[2];

      if (!cache[icon]) {
        cache[icon] = [];
      }
      cache[icon].push(size);
    }
  }
}

for (const [icon, sizes] of Object.entries(cache)) {
  let size = sizes.includes("24") ? "24" : sizes.at(-1)!;

  const component = `${icon}${size}Regular`;
  if (!imports.includes(component)) {
    imports.push(component);
    map.push(`${icon}: ${component}`);
  }
}

const content = `import {
  ${imports.join(",\n\t")}
} from "@fluentui/react-icons";

export const IconsMap = {
  ${map.join(",\n\t")}
};

export type IconName = keyof typeof IconsMap;
`;

writeFileSync(dest, content, "utf-8");
