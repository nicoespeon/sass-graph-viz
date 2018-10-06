import * as sassGraph from "sass-graph";

import { Graph } from "../../graph";
import { fileNameRelativeTo } from "../../path";

export function sassGraphGraphToGraph({ index, dir }: sassGraph.Graph): Graph {
  const graph = new Graph();

  Object.keys(index).forEach((child) => {
    const childInDir = fileNameRelativeTo(dir, child);
    const node = index[child];

    if (hasNoParent(node)) {
      graph.addNode(childInDir);
    }

    const parents = node.importedBy;
    parents.forEach((parent) => {
      const parentInDir = fileNameRelativeTo(dir, parent);
      graph.addEdge(parentInDir, childInDir);
    });
  });

  return graph;
}

function hasNoParent(node: sassGraph.Node[""]): boolean {
  return node.importedBy.length === 0;
}
