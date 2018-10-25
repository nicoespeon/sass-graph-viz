import { Node, Edge } from "vis";

import { Graph } from "../../graph";
import { colors } from "./colors";

type VisGraph = { nodes: Node[]; edges: Edge[] };

export function graphToVisGraph(graph: Graph): VisGraph {
  const nodes = graph.getNodes().map((node) => ({
    id: node.name,
    label: node.name,
    color: !node.isPartial()
      ? colors.file
      : node.isOrphan()
        ? colors.orphanPartial
        : colors.partial,
  }));

  const edges = graph
    .getEdges()
    .map(([parent, child]) => ({ from: parent.name, to: child.name }));

  return { nodes, edges };
}
