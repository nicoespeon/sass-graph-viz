import * as sassGraph from "sass-graph";
import * as path from "path";
import * as fs from "fs";

import { Graph } from "../graph";

export type Path = string;

export function generateGraphFromSassGraph(target: Path): Graph {
  if (isFolder(target)) {
    return sassGraphGraphToGraph(target, sassGraph.parseDir(target));
  }

  const rootFolder = path.dirname(target);
  return sassGraphGraphToGraph(rootFolder, sassGraph.parseFile(target));
}

function isFolder(target: Path): boolean {
  return fs.existsSync(target) && fs.lstatSync(target).isDirectory();
}

export function sassGraphGraphToGraph(
  rootFolder: Path,
  { index }: sassGraph.Graph,
): Graph {
  const graph = new Graph();

  Object.keys(index).forEach((child) => {
    const parents = index[child].importedBy;
    parents.forEach((parent) => {
      graph.addVertice(
        fileNameRelativeTo(rootFolder, parent),
        fileNameRelativeTo(rootFolder, child),
      );
    });
  });

  return graph;
}

function fileNameRelativeTo(rootFolder: Path, file: Path): string {
  return path.relative(rootFolder, file).replace(path.extname(file), "");
}
