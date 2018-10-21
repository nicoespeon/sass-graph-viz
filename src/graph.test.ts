import { Graph } from "./graph";

it("should add a node", () => {
  const graph = new Graph();

  graph.addNode("main");

  const nodes = graph.getNodes().map((node) => node.name);
  expect(nodes).toEqual(["main"]);
});

it("should add nodes when adding an edge", () => {
  const graph = new Graph();

  graph.addEdge("main", "_header");

  const nodes = graph.getNodes().map((node) => node.name);
  expect(nodes).toEqual(["main", "_header"]);
});

it("should ignore adding a node that already exists", () => {
  const graph = new Graph();

  graph.addEdge("main", "_header");
  graph.addNode("main");

  const edgesCount = graph.getEdges().length;
  expect(edgesCount).toBe(1);
});

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

  it("should keep an isolated node", () => {
    const graph = new Graph();
    graph.addNode("main");

    const filteredGraph = graph.focusOnNode("main");

    expect(filteredGraph).toEqual(graph);
  });
});

describe("without externals", () => {
  it("should filter out all externals nodes", () => {
    const graph = new Graph();
    graph.addEdge("main", "_header");
    graph.addEdge("main", "../_external-file");
    graph.addEdge("_header", "_colors");
    graph.addEdge("_header", "../../node_modules/bootstrap/main");
    graph.addEdge(
      "../../node_modules/bootstrap/main",
      "../../node_modules/bootstrap/_variables",
    );
    graph.addEdge("../_external_partial", "_variables");

    const filteredGraph = graph.withoutExternals();

    const expectedGraph = new Graph();
    expectedGraph.addEdge("main", "_header");
    expectedGraph.addEdge("_header", "_colors");
    expect(filteredGraph).toEqual(expectedGraph);
  });
});
