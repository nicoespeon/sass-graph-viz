import { Graph } from "../../graph";
import { graphToVisGraph } from "./translator";
import { colors } from "./colors";

it("translate an empty graph", () => {
  const graph = new Graph();

  const visGraph = graphToVisGraph(graph);

  const emptyVisGraph = { nodes: [], edges: [] };
  expect(visGraph).toEqual(emptyVisGraph);
});

it("translate a graph with some edges", () => {
  const graph = new Graph();
  graph.addEdge("main", "_header");
  graph.addEdge("main", "_footer");

  const visGraph = graphToVisGraph(graph);

  const expectedVisGraph = {
    nodes: [
      expect.objectContaining({ id: "main", label: "main" }),
      expect.objectContaining({ id: "_header", label: "_header" }),
      expect.objectContaining({ id: "_footer", label: "_footer" }),
    ],
    edges: [{ from: "main", to: "_header" }, { from: "main", to: "_footer" }],
  };
  expect(visGraph).toEqual(expectedVisGraph);
});

it("translate a graph with orphan nodes", () => {
  const graph = new Graph();
  graph.addEdge("main", "_footer");
  graph.addNode("_header");

  const visGraph = graphToVisGraph(graph);

  const expectedVisGraph = {
    nodes: [
      expect.objectContaining({ id: "main", label: "main" }),
      expect.objectContaining({ id: "_footer", label: "_footer" }),
      expect.objectContaining({ id: "_header", label: "_header" }),
    ],
    edges: [{ from: "main", to: "_footer" }],
  };
  expect(visGraph).toEqual(expectedVisGraph);
});

it("sets proper colors to files & partials", () => {
  const graph = new Graph();
  graph.addEdge("main", "_header");
  graph.addEdge("main", "_footer");
  graph.addEdge("mobile", "_header");
  graph.addEdge("_header", "vars/_colors");
  graph.addNode("_orphan-partial");

  const visGraph = graphToVisGraph(graph);

  const expectedNodes = expect.arrayContaining([
    expect.objectContaining({ id: "main", color: colors.file }),
    expect.objectContaining({ id: "_header", color: colors.partial }),
    expect.objectContaining({ id: "_footer", color: colors.partial }),
    expect.objectContaining({ id: "mobile", color: colors.file }),
    expect.objectContaining({
      id: "vars/_colors",
      color: colors.partial,
    }),
    expect.objectContaining({
      id: "_orphan-partial",
      color: colors.orphanPartial,
    }),
  ]);
  expect(visGraph.nodes).toEqual(expectedNodes);
});

it("escape backslashes in node names", () => {
  const graph = new Graph();
  graph.addEdge("main", "..\\src\\_footer");
  graph.addNode("..\\src\\_header");

  const visGraph = graphToVisGraph(graph);

  const expectedVisGraph = {
    nodes: [
      expect.objectContaining({ id: "main", label: "main" }),
      expect.objectContaining({
        id: "..\\\\src\\\\_footer",
        label: "..\\\\src\\\\_footer",
      }),
      expect.objectContaining({
        id: "..\\\\src\\\\_header",
        label: "..\\\\src\\\\_header",
      }),
    ],
    edges: [{ from: "main", to: "..\\\\src\\\\_footer" }],
  };
  expect(visGraph).toEqual(expectedVisGraph);
});
