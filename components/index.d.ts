declare module "*.scss" {
  const url: string;
  export default url;
}

declare module "*.gql" {
  import type { DocumentNode } from "graphql";

  const content: DocumentNode;
  export default content;
}
