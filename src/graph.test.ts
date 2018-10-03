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
