import * as path from "path";

export class Graph {
  private graph: { [parent: string]: string[] } = {};
  private orphanNodes = new Set<string>();

  addNode(node: string) {
    if (this.graph[node]) return;

    this.graph[node] = [];
    this.orphanNodes.add(node);
  }

  addEdge(parent: string, child: string) {
    this.addNode(parent);
    this.addNode(child);
    this.graph[parent].push(child);
    this.orphanNodes.delete(child);
  }

  getNodes(): Node[] {
    return Object.keys(this.graph).map((nodeName) => this.createNode(nodeName));
  }

  getEdges(): Node[][] {
    const edges: Node[][] = [];

    Object.keys(this.graph).forEach((parent) => {
      this.graph[parent].forEach((child) => {
        edges.push([this.createNode(parent), this.createNode(child)]);
      });
    });

    return edges;
  }

  focusOnNode(nodeName: string): Graph {
    const graph = new Graph();
    graph.addNode(nodeName);

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

    this.getNodes().forEach((node) => {
      if (!node.isExternal()) graph.addNode(node.name);
    });

    this.getEdges().forEach(([parent, child]) => {
      if (!parent.isExternal() && !child.isExternal()) {
        graph.addEdge(parent.name, child.name);
      }
    });

    return graph;
  }

  toString(): string {
    return JSON.stringify(this.graph, null, 2);
  }

  private createNode(nodeName: string): Node {
    return this.isOrphan(nodeName)
      ? new OrphanNode(nodeName)
      : new Node(nodeName);
  }

  private isOrphan(nodeName: string): boolean {
    return this.orphanNodes.has(nodeName);
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
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  isPartial(): boolean {
    return path.basename(this.name).startsWith("_");
  }

  isExternal(): boolean {
    return this.name.startsWith("..");
  }

  isOrphan(): boolean {
    return false;
  }
}

class OrphanNode extends Node {
  isOrphan() {
    return true;
  }
}
