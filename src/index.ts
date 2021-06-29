import * as path from "path";

import { generateGraphFromSassGraph } from "./generation/sass-graph";
import { renderGraphToVizGraph } from "./rendering/viz.js";
import { renderGraphToVisGraph } from "./rendering/vis";
import { Path, isFolder, fileNameRelativeTo } from "./path";
import { logErrors } from "./logger";

interface Options {
  excludeExternals?: boolean;
  useSimpleViz?: boolean;
  withDebugLogs?: boolean;
  loadPaths?: Path[];
  port?: number;
}

export function generateVisualGraph(
  target: Path,
  {
    excludeExternals = false,
    useSimpleViz = false,
    withDebugLogs = false,
    loadPaths = [],
    port = 3000,
  }: Options = {},
): void {
  const renderGraph = useSimpleViz
    ? renderGraphToVizGraph
    : renderGraphToVisGraph;
  const log = withDebugLogs ? logErrors : () => {};

  log("\nGenerate visual graph for", target);

  const targetFolder = isFolder(target) ? target : path.dirname(target);
  log("Resolved target folder is", targetFolder);
  log("Loaded paths are", loadPaths.join(", "));

  let graph = generateGraphFromSassGraph(targetFolder, loadPaths);
  log("Generated graph from target folder is", graph.toString());

  if (!isFolder(target)) {
    const file = fileNameRelativeTo(targetFolder, target);
    log("Focus graph on file", file);

    graph = graph.focusOnNode(file);
    log("Focused graph is", graph.toString());
  }

  if (excludeExternals) {
    log("Exclude external elements from graph");
    graph = graph.withoutExternals();
    log("Graph without external elements is", graph.toString());
  }

  log("Render graph through port", port.toString());
  renderGraph(port, graph);
}
