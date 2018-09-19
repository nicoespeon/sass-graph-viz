import { flow } from "lodash";

import { Path, generateGraphFromSassGraph } from "./generation/sass-graph";
import { renderGraphToVizGraph } from "./rendering/viz.js";
import { renderGraphToVisGraph } from "./rendering/vis";

export function generateVisualGraph(
  pathToFolder: Path,
  useSimpleViz = false,
): void {
  const renderGraph = useSimpleViz
    ? renderGraphToVizGraph
    : renderGraphToVisGraph;

  flow(
    generateGraphFromSassGraph,
    renderGraph,
  )(pathToFolder);
}
