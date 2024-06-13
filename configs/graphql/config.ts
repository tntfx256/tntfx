import type { AddPluginConfig } from "@graphql-codegen/add/typings/config";
import type { TypeScriptTypedDocumentNodesConfig } from "@graphql-codegen/typed-document-node";
import type { TypeScriptPluginConfig } from "@graphql-codegen/typescript";
import type { TypeScriptDocumentsPluginConfig } from "@graphql-codegen/typescript-operations";
import type { TypeScriptResolversPluginConfig } from "@graphql-codegen/typescript-resolvers";
import { DocumentMode } from "@graphql-codegen/visitor-plugin-common";
import type { ValidationSchemaPluginConfig } from "graphql-codegen-typescript-validation-schema/dist/types/config";
import { join } from "node:path";

export const Paths = {
  directives: join(__dirname, "directives.gql"),
  schema: "src/**/schema.{gql,graphql}",
  documents: "src/**/documents.{gql,graphql}",
  output: "src/__generated",
  types: "types.generated.ts",
  client: "client.generated.ts",
  server: "server.generated.ts",
};

// types
const tsPluginConfig: TypeScriptPluginConfig = {
  defaultScalarType: "unknown",
  skipTypename: true,
  useTypeImports: true,
  scalars: {
    Date: "Date",
  },
};
const validationSchemaPluginConfig: Omit<ValidationSchemaPluginConfig, keyof TypeScriptPluginConfig> = {
  schema: "zod",
  withObjectType: true,
  validationSchemaExportType: "const",
  scalarSchemas: {
    Date: "z.date()",
    Email: "z.string().email()",
  },
  directives: {
    required: {
      required: "required",
    },
    constraint: {
      required: ["required", "true", "$1"],
      minLength: ["min", "$1"],
      maxLength: ["max", "$1"],
      length: ["length", "$1"],
      pattern: ["regex", "/$1/"],
      min: ["min", "$1 - 1"],
      max: ["max", "$1 + 1"],

      format: {
        date: "date",
        email: "email",
      },
    },
  },
};

export const typePlugins = ["typescript", "typescript-validation-schema"];
export const typePluginsConfig: ValidationSchemaPluginConfig = {
  ...tsPluginConfig,
  ...validationSchemaPluginConfig,
};

// client
export const clientPlugins = ["add", "typescript-operations", "typed-document-node"];
type DocumentConfig = TypeScriptDocumentsPluginConfig & TypeScriptTypedDocumentNodesConfig;
export const clientPluginsConfig: Omit<DocumentConfig & AddPluginConfig, keyof TypeScriptPluginConfig> = {
  content: `import * as types from "./${Paths.types.replace(".ts", "")}"`,
  namespacedImportName: "types",
  documentMode: DocumentMode.string,
  // flattenGeneratedTypes: true,
  // addTypenameToSelectionSets: false,
};

// server
export const serverPlugins = ["add", "typescript-resolvers"];
export const serverPluginsConfig: Omit<TypeScriptResolversPluginConfig & AddPluginConfig, keyof TypeScriptPluginConfig> = {
  content: `import * as types from "./${Paths.types.replace(".ts", "")}"`,
  namespacedImportName: "types",
  useIndexSignature: true,
};

// index file
export const indexFilePlugins = ["add"];
export const indexFilePluginsConfig: Omit<AddPluginConfig, keyof TypeScriptPluginConfig> = {
  content: [
    `export * from "./${Paths.types.replace(".ts", "")}"`,
    `export * from "./${Paths.client.replace(".ts", "")}"`,
    `export * from "./${Paths.server.replace(".ts", "")}"`,
  ],
};
