import * as path from "path";

export class Graph {
  private graph: { [parent: string]: string[] } = {};

  addNode(node: string) {
    if (!this.graph[node]) this.graph[node] = [];
  }

  addEdge(parent: string, child: string) {
    this.addNode(parent);
    this.addNode(child);
    this.graph[parent].push(child);
  }

  getNodes(): Node[] {
    return Object.keys(this.graph).map((nodeName) => new Node(nodeName));
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

  focusOnNode(nodeName: string): Graph {
    const graph = new Graph();

    this.getEdges().forEach(([parent, child]) => {
      if (
        this.isAncestorOrDescendent(parent.name, nodeName) &&
        this.isAncestorOrDescendent(child.name, nodeName)
      ) {
        graph.addEdge(parent.name, child.name);
      }
    });

    return graph;
  }

  withoutExternals(): Graph {
    const graph = new Graph();

    this.getEdges().forEach(([parent, child]) => {
      if (!parent.isExternal() && !child.isExternal()) {
        graph.addEdge(parent.name, child.name);
      }
    });

    return graph;
  }

  private isAncestorOrDescendent(node: string, target: string): boolean {
    return this.isAncestor(node, target) || this.isDescendent(node, target);
  }

  private isAncestor(node: string, target: string): boolean {
    return this.isDescendent(target, node);
  }

  private isDescendent(
    node: string,
    target: string,
    visitedTargets: string[] = [],
  ): boolean {
    // Don't visit twice a target for performance. Avoid blowing call stack.
    if (visitedTargets.includes(target)) return false;
    visitedTargets.push(target);

    if (node === target) return true;

    const targetChildren = this.graph[target];
    if (!targetChildren) return false;

    return (
      targetChildren.includes(node) ||
      targetChildren.some((child) =>
        this.isDescendent(node, child, visitedTargets),
      )
    );
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

  isExternal(): boolean {
    return this.name.startsWith("..");
  }
}
