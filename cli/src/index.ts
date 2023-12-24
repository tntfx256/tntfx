import { genComponent } from "./gen/component";
import { genWorkspaceProject } from "./gen/workspace";

const [type, ...options] = process.argv.slice(2);

const root = "../../";

options.unshift(root);

// if (command === "gen") {
// const [type, ...options] = args;

switch (type) {
  case "component":
    genComponent(options);
    break;
  case "project":
    genWorkspaceProject(options);
    break;
  default:
    throw new Error(`Unknown type ${type}`);
}
// }
