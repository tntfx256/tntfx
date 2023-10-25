import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import type { IExecutableSchemaDefinition } from "@graphql-tools/schema";

type TContext = {};

export function createGraphQLHandler(
  typeDefs: IExecutableSchemaDefinition<TContext>["typeDefs"],
  resolvers: IExecutableSchemaDefinition<TContext>["resolvers"],
) {
  const server = new ApolloServer({ resolvers, typeDefs });

  return startServerAndCreateNextHandler(server);
}
