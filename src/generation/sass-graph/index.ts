import * as sassGraph from "sass-graph";
import * as path from "path";

import { Graph } from "../../graph";
import { Path, isFolder } from "../../path";
import { sassGraphGraphToGraph } from "./translator";

export function generateGraphFromSassGraph(target: Path): Graph {
  const rootFolder = isFolder(target) ? target : path.dirname(target);
  return sassGraphGraphToGraph(sassGraph.parseDir(rootFolder));
}
