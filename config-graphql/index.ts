import type { CodegenConfig } from "@graphql-codegen/cli";
import type { TypeScriptTypedDocumentNodesConfig } from "@graphql-codegen/typed-document-node";
import type { TypeScriptPluginConfig } from "@graphql-codegen/typescript";
import type { TypeScriptDocumentsPluginConfig } from "@graphql-codegen/typescript-operations";
import type { TypeScriptResolversPluginConfig } from "@graphql-codegen/typescript-resolvers";
import { DocumentMode } from "@graphql-codegen/visitor-plugin-common";
import { appendFileSync, readFileSync } from "fs";

type Config = TypeScriptTypedDocumentNodesConfig &
  TypeScriptPluginConfig &
  TypeScriptDocumentsPluginConfig &
  TypeScriptResolversPluginConfig;

const SCHEMA_PATH = "src/operations/schema.gql";
const DOCUMENTS_PATH = "src/operations/documents.gql";
const OUTPUT_PATH = "src/__generated.ts";

type CreateConfigOption = {
  schemaPath?: string;
  documentPath?: string;
  outputPath?: string;
};

export default function createConfig(options?: CreateConfigOption): CodegenConfig {
  const config: CodegenConfig = {
    overwrite: true,
    ignoreNoDocuments: true,

    schema: options?.schemaPath || SCHEMA_PATH,
    documents: options?.documentPath || DOCUMENTS_PATH,

    generates: {
      [options?.outputPath || OUTPUT_PATH]: {
        plugins: ["typescript", "typescript-operations", "typed-document-node", "typescript-resolvers"],
        config: {
          addTypenameToSelectionSets: false,
          addUnderscoreToArgsType: true,
          arrayInputCoercion: false,
          declarationKind: "interface",
          documentMode: DocumentMode.documentNode,
          emitLegacyCommonJSImports: false,
          enumsAsTypes: true,
          flattenGeneratedTypes: true,
          futureProofEnums: true,
          noGraphQLTag: true,
          optimizeDocumentNode: true,
          preResolveTypes: false,
          skipTypename: true,
          strictScalars: true,
          useIndexSignature: true,
          useTypeImports: true,
          scalars: {
            Upload: "string",
            Date: "number",
          },
        } as Config,
      },
    },

    hooks: {
      afterAllFileWrite() {
        const schema = readFileSync(SCHEMA_PATH, "utf8");
        appendFileSync(OUTPUT_PATH, `\nexport const typeDefs = /* GraphQL */\`${schema}\`;`);
      },
    },
  };

  return config;
}
