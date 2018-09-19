import { Node, Edge } from "vis";

import { Graph } from "../../graph";

type VisGraph = { nodes: Node[]; edges: Edge[] };

export function graphToVisGraph(graph: Graph): VisGraph {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  graph.getVertices().forEach(([parent, child]) => {
    const nodeIds = nodes.map(({ id }) => id);

    if (!nodeIds.includes(parent)) {
      nodes.push({ id: parent, label: parent });
    }

    if (!nodeIds.includes(child)) {
      nodes.push({ id: child, label: child });
    }

    edges.push({ from: parent, to: child });
  });

  return { nodes, edges };
}
