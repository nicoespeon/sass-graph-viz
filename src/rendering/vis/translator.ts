import { Node, Edge } from "vis";

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

  graph.getEdges().forEach(([parent, child]) => {
    const nodeIds = nodes.map(({ id }) => id);

    if (!nodeIds.includes(parent.name)) {
      nodes.push({
        id: parent.name,
        label: parent.name,
        color: parent.isPartial() ? partialColor : fileColor,
      });
    }

    if (!nodeIds.includes(child.name)) {
      nodes.push({
        id: child.name,
        label: child.name,
        color: child.isPartial() ? partialColor : fileColor,
      });
    }

    edges.push({ from: parent.name, to: child.name });
  });

  return { nodes, edges };
}
