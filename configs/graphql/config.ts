import type { TypeScriptTypedDocumentNodesConfig } from "@graphql-codegen/typed-document-node";
import type { TypeScriptPluginConfig } from "@graphql-codegen/typescript";
import type { TypeScriptDocumentsPluginConfig } from "@graphql-codegen/typescript-operations";
import type { ReactQueryRawPluginConfig } from "@graphql-codegen/typescript-react-query/typings/config";
import type { TypeScriptResolversPluginConfig } from "@graphql-codegen/typescript-resolvers";
import type {
  RawClientSideBasePluginConfig,
  RawConfig,
  RawDocumentsConfig,
  RawResolversConfig,
  RawTypesConfig,
} from "@graphql-codegen/visitor-plugin-common";
import { DocumentMode } from "@graphql-codegen/visitor-plugin-common";
import type { ValidationSchemaPluginConfig } from "graphql-codegen-typescript-validation-schema/dist/main/config";

export const plugins = [
  "typescript",
  "typed-document-node",
  "typescript-operations",
  "typescript-resolvers",
  "typescript-validation-schema",
  "typescript-react-query",
];

const rawConfig: RawConfig = {
  allowEnumStringTypes: true,
  strictScalars: false,
  defaultScalarType: "unknown",
  skipTypename: true,
  useTypeImports: true,
  emitLegacyCommonJSImports: false,
  scalars: {
    Date: "Date",
    // ID: { input: "string", output: "string | number" },
    // JSON: "{ [key: string]: any }",
  },
};
const rawTypesConfig: Omit<RawTypesConfig, keyof RawConfig> = {
  declarationKind: "interface",
  addUnderscoreToArgsType: true,
};
const rawResolversConfig: Omit<RawResolversConfig, keyof RawConfig> = {
  addUnderscoreToArgsType: true,
};
const rawClientSideBasePluginConfig: Omit<RawClientSideBasePluginConfig, keyof RawConfig> = {
  noGraphQLTag: true,
  documentMode: DocumentMode.documentNode,
  optimizeDocumentNode: true,
};
const rawDocumentsConfig: Omit<RawDocumentsConfig, keyof RawTypesConfig> = {
  preResolveTypes: false,
};
const typeScriptPluginConfig: Omit<TypeScriptPluginConfig, keyof RawTypesConfig> = {
  useImplementingTypes: true,
  futureProofEnums: true,
};
const typeScriptTypedDocumentNodesConfig: Omit<TypeScriptTypedDocumentNodesConfig, keyof RawClientSideBasePluginConfig> = {
  addTypenameToSelectionSets: false,
  flattenGeneratedTypes: true,
};
const typeScriptDocumentsPluginConfig: Omit<TypeScriptDocumentsPluginConfig, keyof RawDocumentsConfig> = {};
const typeScriptResolversPluginConfig: Omit<TypeScriptResolversPluginConfig, keyof RawResolversConfig> = {
  useIndexSignature: true,
};
const validationSchemaPluginConfig: Omit<ValidationSchemaPluginConfig, keyof TypeScriptPluginConfig> = {
  schema: "zod",
  withObjectType: true,
  scalarSchemas: {
    Date: "z.date()",
    Email: "z.string().email()",
  },
  validationSchemaExportType: "const",
  directives: {
    required: {
      msg: "required",
    },
    constraint: {
      minLength: ["min", "$1"],
      maxLength: ["max", "$1"],
      min: ["min", "$1 - 1"],
      max: ["max", "$1 + 1"],
      format: {
        uuid: "uuid",
        uri: "url",
        email: "email",
      },
    },
  },
};
const reactQueryRawPluginConfig: Omit<ReactQueryRawPluginConfig, keyof RawClientSideBasePluginConfig> = {
  exposeDocument: true,
  reactQueryVersion: 5,
};

interface Config
  extends TypeScriptPluginConfig,
    TypeScriptTypedDocumentNodesConfig,
    TypeScriptDocumentsPluginConfig,
    TypeScriptResolversPluginConfig,
    ValidationSchemaPluginConfig,
    Omit<ReactQueryRawPluginConfig, "scalars"> {}

export const config: Config = {
  ...rawConfig,
  ...rawTypesConfig,
  ...rawResolversConfig,
  ...rawClientSideBasePluginConfig,
  ...rawDocumentsConfig,
  ...typeScriptPluginConfig,
  ...typeScriptTypedDocumentNodesConfig,
  ...typeScriptDocumentsPluginConfig,
  ...typeScriptResolversPluginConfig,
  ...validationSchemaPluginConfig,
  ...reactQueryRawPluginConfig,
};
