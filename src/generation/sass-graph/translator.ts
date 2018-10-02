import * as sassGraph from "sass-graph";
import * as path from "path";

import { Graph } from "../../graph";
import { Path } from "./path";

export function sassGraphGraphToGraph({ index, dir }: sassGraph.Graph): Graph {
  const graph = new Graph();

  Object.keys(index).forEach((child) => {
    const parents = index[child].importedBy;
    parents.forEach((parent) => {
      graph.addEdge(
        fileNameRelativeTo(dir, parent),
        fileNameRelativeTo(dir, child),
      );
    });
  });

  return graph;
}

function fileNameRelativeTo(rootFolder: Path, file: Path): string {
  return path.relative(rootFolder, file).replace(path.extname(file), "");
}
