import { Node, Edge } from "vis";

import { Graph } from "../../graph";

type VisGraph = { nodes: Node[]; edges: Edge[] };

const fileColor: Node["color"] = {
  background: "#FF9392",
  border: "#FF2E2C",
  highlight: { background: "#FF9392", border: "#FF2E2C" },
};
const partialColor: Node["color"] = { background: "#D2E5FF" };
const orphanPartialColor: Node["color"] = {
  background: "#CE83FC",
  border: "#B042F4",
  highlight: { background: "#CE83FC", border: "#B042F4" },
};

export function graphToVisGraph(graph: Graph): VisGraph {
  const nodes = graph.getNodes().map((node) => ({
    id: node.name,
    label: node.name,
    color: !node.isPartial()
      ? fileColor
      : node.isOrphan()
        ? orphanPartialColor
        : partialColor,
  }));

  const edges = graph
    .getEdges()
    .map(([parent, child]) => ({ from: parent.name, to: child.name }));

  return { nodes, edges };
}
