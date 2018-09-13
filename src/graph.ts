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

export type Node = string;
