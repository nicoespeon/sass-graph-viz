import * as sassGraph from "sass-graph";

import { Graph } from "../../graph";
import { fileNameRelativeTo } from "../../path";

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
