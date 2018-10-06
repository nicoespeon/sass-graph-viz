import { Graph } from "../../graph";

type VizGraph = string;

export function graphToVizGraph(graph: Graph): VizGraph {
  return (
    [vizGraphEdges(graph), vizGraphIsolatedNodes(graph)]
      .join("\n")
      // If there is no isolated node, there is a trailing \n we want to remove
      .trim()
  );
}

function escapeUnsupportedCharacter(s: string): string {
  return s.match(/[-\/]/g) ? `"${s}"` : s;
}

function vizGraphEdges(graph: Graph): VizGraph {
  return graph
    .getEdges()
    .map((edge) => edge.map((node) => node.name))
    .map((edge) => edge.map(escapeUnsupportedCharacter))
    .map(([parent, child]) => `${parent} -> ${child}`)
    .join("\n");
}

function vizGraphIsolatedNodes(graph: Graph): VizGraph {
  const connectedNodes = graph
    .getEdges()
    .reduce<string[]>(
      (memo, [parent, child]) => [...memo, parent.name, child.name],
      [],
    );

  return graph
    .getNodes()
    .map((node) => node.name)
    .filter((node) => !connectedNodes.includes(node))
    .join("\n");
}
