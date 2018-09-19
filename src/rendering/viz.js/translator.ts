import { Graph } from "../../graph";

type VizGraph = string;

export function graphToVizGraph(graph: Graph): VizGraph {
  return graph
    .getVertices()
    .map((vertice) => vertice.map(escapeUnsupportedCharacter))
    .map(([parent, child]) => `${parent} -> ${child}`)
    .join("\n");
}

function escapeUnsupportedCharacter(s: string): string {
  return s.match(/[-\/]/g) ? `"${s}"` : s;
}
