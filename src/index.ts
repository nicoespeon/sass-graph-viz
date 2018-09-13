import { flow } from "lodash";
import * as sassGraph from "sass-graph";
import * as path from "path";
import * as express from "express";
// @ts-ignore
import * as opn from "opn";
// @ts-ignore
import * as Viz from "viz.js";
// @ts-ignore
import { Module, render } from "viz.js/full.render";

type Path = string;

export function generateVisualGraph(pathToFolder: Path): void {
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

  toDigraphString(): string {
    return Array.from(this.vertices)
      .map((vertice) => vertice.toDigraphString())
      .join("\n");
  }
}

export class Vertice {
  nodes: Node[];

  constructor(parent: Node, child: Node) {
    this.nodes = [parent, child];
  }

  toDigraphString(): string {
    const [parent, child] = this.nodes.map((node) => node.replace(/-/g, "_"));
    return `${parent} -> ${child}`;
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
  const app = express();

  new Viz({ Module, render })
    .renderString(`digraph { ${graph.toDigraphString()} }`)
    .then((graphHtml: any) => {
      app.get("/", (req, res) => res.send(graphHtml));
      app.listen("3000");
      // If `wait: true`, opn won't resolve until we quit the browser.
      // => don't wait and exit the process after page is open.
      return opn("http://localhost:3000", { wait: false });
    })
    // Wait a bit for the page to be open before we exit.
    .then(() => setTimeout(() => process.exit(0), 300))
    .catch((error: any) => {
      console.error(error);
      console.log(graph.toDigraphString());
    });
}
