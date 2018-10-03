import { Graph } from "./graph";

it("should return graph edges", () => {
  const graph = new Graph();
  graph.addEdge("main", "_base");
  graph.addEdge("main", "_header");
  graph.addEdge("_header", "_colors");
  graph.addEdge("_colors", "_variables");

  const edges = graph
    .getEdges()
    // Resolve nodes name so we can compare.
    .map(([parent, child]) => [parent.name, child.name]);

  expect(edges).toEqual([
    ["main", "_base"],
    ["main", "_header"],
    ["_header", "_colors"],
    ["_colors", "_variables"],
  ]);
});

describe("focus on a node", () => {
  const nodeName = "_footer";

  it("should filter out nodes that are not linked to the given one", () => {
    const graph = new Graph();
    graph.addEdge("main", "_base");
    graph.addEdge("main", "_header");
    graph.addEdge("_base", nodeName);
    graph.addEdge("_header", "_colors");
    graph.addEdge(nodeName, "_colors");
    graph.addEdge("_colors", "_variables");

    const filteredGraph = graph.focusOnNode(nodeName);

    const expectedGraph = new Graph();
    expectedGraph.addEdge("main", "_base");
    expectedGraph.addEdge("_base", nodeName);
    expectedGraph.addEdge(nodeName, "_colors");
    expectedGraph.addEdge("_colors", "_variables");
    expect(filteredGraph).toEqual(expectedGraph);
  });

  it("should handle cyclic dependencies", () => {
    const graph = new Graph();
    graph.addEdge("main", nodeName);
    graph.addEdge(nodeName, "_colors");
    graph.addEdge("_colors", "_variables");
    graph.addEdge("_variables", "_colors");

    expect(() => graph.focusOnNode(nodeName)).not.toThrow();
  });
});
