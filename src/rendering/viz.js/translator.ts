import { Graph } from "../../graph";

type VizGraph = string;

export function graphToVizGraph(graph: Graph): VizGraph {
  return Array.from(graph.vertices)
    .map((vertice) => {
      const [parent, child] = vertice.nodes.map(escapeUnsupportedCharacter);
      return `${parent} -> ${child}`;
    })
    .join("\n");
}

function escapeUnsupportedCharacter(s: string): string {
  return s.match(/[-\/]/g) ? `"${s}"` : s;
}
