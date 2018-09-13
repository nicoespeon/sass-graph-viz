import { flow } from "lodash";

import { Path, generateGraphFromSassGraph } from "./generation/sass-graph";
import { renderGraphToVizGraph } from "./rendering/viz";

export function generateVisualGraph(pathToFolder: Path): void {
  flow(
    generateGraphFromSassGraph,
    renderGraphToVizGraph,
  )(pathToFolder);
}
