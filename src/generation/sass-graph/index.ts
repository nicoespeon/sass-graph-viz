import * as sassGraph from "sass-graph";

import { Graph } from "../../graph";
import { Path } from "../../path";
import { sassGraphGraphToGraph } from "./translator";

export function generateGraphFromSassGraph(rootFolder: Path): Graph {
  return sassGraphGraphToGraph(
    sassGraph.parseDir(rootFolder, {
      extensions: ["sass", "scss", "less", "css"],
    }),
  );
}
