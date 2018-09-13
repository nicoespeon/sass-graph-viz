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
    generateGraphFromSassGraph,
    renderGraphToVizGraph,
  )(pathToFolder);
}

// GRAPH DOMAIN

export class Graph {
  vertices: Set<Vertice>;

  constructor() {
    this.vertices = new Set();
  }

  addVertice(vertice: Vertice) {
    this.vertices.add(vertice);
  }
}

export class Vertice {
  nodes: Node[];

  constructor(parent: Node, child: Node) {
    this.nodes = [parent, child];
  }
}

type Node = string;

// GRAPH GENERATION (with sass-graph)

function generateGraphFromSassGraph(pathToFolder: Path): Graph {
  const sassGraphGraph = sassGraph.parseDir(pathToFolder);
  return sassGraphGraphToGraph(sassGraphGraph);
}

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

// GRAPH RENDERING (with viz)

function renderGraphToVizGraph(graph: Graph): void {
  const app = express();
  const vizGraph = graphToVizGraph(graph);

  new Viz({ Module, render })
    .renderString(`digraph { ${vizGraph} }`)
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
      console.log(vizGraph);
    });
}

function graphToVizGraph(graph: Graph): string {
  return Array.from(graph.vertices)
    .map((vertice) => {
      const [parent, child] = vertice.nodes.map((node) =>
        node.replace(/-/g, "_"),
      );
      return `${parent} -> ${child}`;
    })
    .join("\n");
}
