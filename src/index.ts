import * as path from "path";

import { generateGraphFromSassGraph } from "./generation/sass-graph";
import { renderGraphToVizGraph } from "./rendering/viz.js";
import { renderGraphToVisGraph } from "./rendering/vis";
import { Path, isFolder, fileNameRelativeTo } from "./path";

interface Options {
  excludeExternals?: boolean;
  useSimpleViz?: boolean;
  port?: number;
}

export function generateVisualGraph(
  target: Path,
  { excludeExternals = false, useSimpleViz = false, port = 3000 }: Options = {},
): void {
  const renderGraph = useSimpleViz
    ? renderGraphToVizGraph
    : renderGraphToVisGraph;

  const targetFolder = isFolder(target) ? target : path.dirname(target);
  let graph = generateGraphFromSassGraph(targetFolder);

  if (!isFolder(target)) {
    const file = fileNameRelativeTo(targetFolder, target);
    graph = graph.focusOnNode(file);
  }

  if (excludeExternals) {
    graph = graph.withoutExternals();
  }

  renderGraph(port, graph);
}
