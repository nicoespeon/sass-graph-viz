import * as sassGraph from "sass-graph";
import * as path from "path";

import { Graph } from "../graph";

export type Path = string;

export function generateGraphFromSassGraph(pathToFolder: Path): Graph {
  const sassGraphGraph = sassGraph.parseDir(pathToFolder);
  return sassGraphGraphToGraph(sassGraphGraph);
}

export function sassGraphGraphToGraph({ index, dir }: sassGraph.Graph): Graph {
  const fileInDir = fileInFolder.bind(null, dir);
  const graph = new Graph();

  Object.keys(index).forEach((child) => {
    const parents = index[child].importedBy;
    parents.forEach((parent) => {
      graph.addVertice(fileInDir(parent), fileInDir(child));
    });
  });

  return graph;
}

function fileInFolder(rootFolder: Path, file: string): string {
  return path.relative(rootFolder, file).replace(path.extname(file), "");
}
