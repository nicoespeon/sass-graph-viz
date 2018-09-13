export class Graph {
  vertices: Set<Vertice>;

  constructor() {
    this.vertices = new Set();
  }

  addVertice(parent: Node, child: Node) {
    this.vertices.add(new Vertice(parent, child));
  }
}

class Vertice {
  nodes: Node[];

  constructor(parent: Node, child: Node) {
    this.nodes = [parent, child];
  }
}

export type Node = string;
