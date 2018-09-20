import * as path from "path";

export class Graph {
  private vertices: Set<Vertice>;

  constructor() {
    this.vertices = new Set();
  }

  addVertice(parent: string, child: string) {
    this.vertices.add(new Vertice(parent, child));
  }

  getVertices(): Node[][] {
    const vertices: Node[][] = [];

    this.vertices.forEach((vertice) => {
      vertices.push(vertice.nodes);
    });

    return vertices;
  }
}

class Vertice {
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
