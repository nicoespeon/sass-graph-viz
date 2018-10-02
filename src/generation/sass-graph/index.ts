import * as sassGraph from "sass-graph";
import * as path from "path";

import { Graph } from "../../graph";
import { Path, isFolder } from "./path";
import { sassGraphGraphToGraph } from "./translator";

export { Path } from "./path";

export function generateGraphFromSassGraph(target: Path): Graph {
  const rootFolder = isFolder(target) ? target : path.dirname(target);
  const graph = sassGraph.parseDir(rootFolder);
  return sassGraphGraphToGraph(graph);
}
