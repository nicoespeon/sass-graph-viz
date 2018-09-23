import { flow } from "lodash";

import { Path, generateGraphFromSassGraph } from "./generation/sass-graph";
import { renderGraphToVizGraph } from "./rendering/viz.js";
import { renderGraphToVisGraph } from "./rendering/vis";

export function generateVisualGraph(
  target: Path,
  useSimpleViz = false,
  port = 3000,
): void {
  const renderGraph = useSimpleViz
    ? renderGraphToVizGraph
    : renderGraphToVisGraph;

  flow(
    generateGraphFromSassGraph,
    (graph) => renderGraph(port, graph),
  )(target);
}
