import type { Types } from "@graphql-codegen/plugin-helpers";
import { globSync } from "fast-glob";
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  clientPlugins,
  clientPluginsConfig,
  indexFilePlugins,
  indexFilePluginsConfig,
  Paths,
  serverPlugins,
  serverPluginsConfig,
  typePlugins,
  typePluginsConfig,
} from "./config";

type CreateConfigOption = {
  schemaPath?: Types.InstanceOrArray<Types.Schema>;
  documentsPath?: Types.InstanceOrArray<Types.Schema>;
  outputPath?: string;
};

export default function createConfig(options?: CreateConfigOption): Types.Config {
  const schemaPath = options?.schemaPath || Paths.schema;
  const documentsPath = options?.documentsPath || Paths.documents;
  const outputPath = options?.outputPath || Paths.output;

  if (!existsSync(outputPath)) {
    mkdirSync(outputPath, { recursive: true });
  }

  const schemaFiles = (
    Array.isArray(schemaPath) ? [Paths.directives, ...schemaPath] : [Paths.directives, schemaPath]
  ) as string[];
  const schema = globSync(schemaFiles)
    .map((file) => readFileSync(file, "utf-8"))
    .join("\n");

  const documentsFiles = (Array.isArray(documentsPath) ? documentsPath : [documentsPath]) as string[];
  const documents = globSync(documentsFiles)
    .map((file) => readFileSync(file, "utf-8"))
    .join("\n");

  const output = {
    types: join(outputPath, Paths.types),
    client: join(outputPath, Paths.client),
    server: join(outputPath, Paths.server),
    index: join(outputPath, "index.ts"),
  };

  const generatorConfig: Types.Config = {
    overwrite: true,

    schema,
    documents,

    generates: {
      [output.types]: {
        plugins: typePlugins,
        config: typePluginsConfig,
      },
      [output.client]: {
        plugins: clientPlugins,
        config: clientPluginsConfig,
      },
      [output.server]: {
        plugins: serverPlugins,
        config: serverPluginsConfig,
      },
      [output.index]: {
        plugins: indexFilePlugins,
        config: indexFilePluginsConfig,
      },
    },

    hooks: {
      afterAllFileWrite() {
        appendFileSync(output.server, `\nexport const typeDefs = /* GraphQL */\`\n${schema}\``);

        // let clientCode = readFileSync(output.client, "utf-8");
        // clientCode = clientCode.replace(/` as unknown as DocumentNode<.*>/g, "`");
        // clientCode = clientCode.replace(/gql`/g, "/* GraphQL */`");
        // writeFileSync(output.client, clientCode);
      },
    },
  };

  return generatorConfig;
}
