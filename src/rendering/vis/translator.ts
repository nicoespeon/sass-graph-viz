import { Node, Edge } from "vis";
import * as path from "path";

import { Graph } from "../../graph";

type VisGraph = { nodes: Node[]; edges: Edge[] };

const fileColor: Node["color"] = {
  background: "#FF9392",
  border: "#FF2E2C",
  highlight: { background: "#FF9392", border: "#FF2E2C" },
};
const partialColor: Node["color"] = { background: "#D2E5FF" };

export function graphToVisGraph(graph: Graph): VisGraph {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  graph.getVertices().forEach(([parent, child]) => {
    const nodeIds = nodes.map(({ id }) => id);

    if (!nodeIds.includes(parent)) {
      nodes.push({
        id: parent,
        label: parent,
        color: isPartial(parent) ? partialColor : fileColor,
      });
    }

    if (!nodeIds.includes(child)) {
      nodes.push({
        id: child,
        label: child,
        color: isPartial(child) ? partialColor : fileColor,
      });
    }

    edges.push({ from: parent, to: child });
  });

  return { nodes, edges };
}

// TODO: move this up to Grapsh domain
function isPartial(node: string): boolean {
  return path.basename(node).startsWith("_");
}
