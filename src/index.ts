import * as path from "path";

import { generateGraphFromSassGraph } from "./generation/sass-graph";
import { renderGraphToVizGraph } from "./rendering/viz.js";
import { renderGraphToVisGraph } from "./rendering/vis";
import { Path, isFolder, fileNameRelativeTo } from "./path";
import { Graph } from "./graph";

export function generateVisualGraph(
  target: Path,
  useSimpleViz = false,
  port = 3000,
): void {
  const renderGraph = useSimpleViz
    ? renderGraphToVizGraph
    : renderGraphToVisGraph;

  let graph: Graph;
  if (isFolder(target)) {
    graph = generateGraphFromSassGraph(target);
  } else {
    const targetFolder = path.dirname(target);
    const file = fileNameRelativeTo(targetFolder, target);
    graph = generateGraphFromSassGraph(targetFolder).focusOnNode(file);
  }

  renderGraph(port, graph);
}
