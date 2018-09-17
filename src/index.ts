import { flow } from "lodash";

import { Path, generateGraphFromSassGraph } from "./generation/sass-graph";
import { renderGraphToVisGraph } from "./rendering/vis";

export function generateVisualGraph(pathToFolder: Path): void {
  flow(
    generateGraphFromSassGraph,
    renderGraphToVisGraph,
  )(pathToFolder);
}
