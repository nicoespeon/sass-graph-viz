import { flow } from "lodash";
import * as sassGraph from "sass-graph";
import * as path from "path";

type Path = string;

export function generateDepsGraph(pathToFolder: Path): void {
  flow(
    generateSassGraph,
    sassGraphGraphToGraph,
    renderGraph,
  )(pathToFolder);
}

function generateSassGraph(pathToFolder: Path): sassGraph.Graph {
  return sassGraph.parseDir(pathToFolder);
}

export class Graph {
  vertices: Set<Vertice>;

  constructor() {
    this.vertices = new Set();
  }

  addVertice(vertice: Vertice) {
    this.vertices.add(vertice);
  }

  toString(): string {
    let result = "";
    this.vertices.forEach((vertice) => (result += `${vertice.toString()}\n`));
    return result;
  }
}

export class Vertice {
  nodes: Node[];

  constructor(parent: Node, child: Node) {
    this.nodes = [parent, child];
  }

  toString(): string {
    const [parent, child] = this.nodes;
    return `${parent} => ${child}`;
  }
}

type Node = string;

export function sassGraphGraphToGraph({ index, dir }: sassGraph.Graph): Graph {
  const nodeInDir = nodeInFolder.bind(null, dir);
  const graph = new Graph();

  Object.keys(index).forEach((child) => {
    const parents = index[child].importedBy;
    parents.forEach((parent) => {
      graph.addVertice(new Vertice(nodeInDir(parent), nodeInDir(child)));
    });
  });

  return graph;
}

function nodeInFolder(rootFolder: Path, node: Node): Node {
  return path.basename(path.relative(rootFolder, node), path.extname(node));
}

function renderGraph(graph: Graph): void {
  console.log(graph.toString());
}
