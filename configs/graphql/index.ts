import type { CodegenConfig } from "@graphql-codegen/cli";
import { appendFileSync, readFileSync } from "fs";
import { join } from "path";
import { config, plugins } from "./config";

const DIRECTIVES = readFileSync(join(__dirname, "directives.gql"), "utf8");
const SCHEMA_PATH = "src/operations/schema.gql";
const DOCUMENTS_PATH = "src/operations/documents.gql";
const CLIENT_OUTPUT_PATH = "src/__generated.ts";

type CreateConfigOption = {
  schemaPath?: string;
  documentPath?: string;
  clientOutputPath?: string;
  serverOutputPath?: string;
};

export default function createConfig(options?: CreateConfigOption): CodegenConfig {
  const schemaPath = options?.schemaPath || SCHEMA_PATH;
  const documentsPath = options?.documentPath || DOCUMENTS_PATH;
  const outputPath = options?.clientOutputPath || CLIENT_OUTPUT_PATH;

  const generatorConfig: CodegenConfig = {
    overwrite: true,
    ignoreNoDocuments: true,

    schema: schemaPath,
    documents: documentsPath,

    generates: { [outputPath]: { config, plugins } },

    hooks: {
      afterAllFileWrite() {
        const schema = readFileSync(schemaPath, "utf8");
        appendFileSync(outputPath, `\nexport const typeDefs = /* GraphQL */\`${DIRECTIVES}\n${schema}\`;`);
      },
    },
  };

  return generatorConfig;
}
