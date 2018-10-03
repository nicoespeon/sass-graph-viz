import * as path from "path";

export class Graph {
  private graph: { [parent: string]: string[] } = {};

  addEdge(parent: string, child: string) {
    if (!this.graph[parent]) this.graph[parent] = [];
    this.graph[parent].push(child);
  }

  getEdges(): Node[][] {
    const edges: Node[][] = [];

    Object.keys(this.graph).forEach((parent) => {
      this.graph[parent].forEach((child) => {
        edges.push([new Node(parent), new Node(child)]);
      });
    });

    return edges;
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
