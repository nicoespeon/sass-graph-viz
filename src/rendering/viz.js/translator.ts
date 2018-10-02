import { Graph } from "../../graph";

type VizGraph = string;

export function graphToVizGraph(graph: Graph): VizGraph {
  return graph
    .getEdges()
    .map((edge) => edge.map((node) => node.name))
    .map((edge) => edge.map(escapeUnsupportedCharacter))
    .map(([parent, child]) => `${parent} -> ${child}`)
    .join("\n");
}

function escapeUnsupportedCharacter(s: string): string {
  return s.match(/[-\/]/g) ? `"${s}"` : s;
}
