export class Graph {
  private vertices: Set<Vertice>;

  constructor() {
    this.vertices = new Set();
  }

  addVertice(parent: Node, child: Node) {
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

  constructor(parent: Node, child: Node) {
    this.nodes = [parent, child];
  }
}

export type Node = string;
