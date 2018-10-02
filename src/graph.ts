import * as path from "path";

export class Graph {
  private edges: Set<Edge>;

  constructor() {
    this.edges = new Set();
  }

  addEdge(parent: string, child: string) {
    this.edges.add(new Edge(parent, child));
  }

  getEdges(): Node[][] {
    const edges: Node[][] = [];

    this.edges.forEach((edge) => {
      edges.push(edge.nodes);
    });

    return edges;
  }
}

class Edge {
  nodes: Node[];

  constructor(parent: string, child: string) {
    this.nodes = [new Node(parent), new Node(child)];
  }
}

class Node {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  isPartial(): boolean {
    return path.basename(this.name).startsWith("_");
  }
}
