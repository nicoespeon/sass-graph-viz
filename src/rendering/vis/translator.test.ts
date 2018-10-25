import { Graph } from "../../graph";
import { graphToVisGraph } from "./translator";

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

  const expectedFileColor = {
    background: "#FF9392",
    border: "#FF2E2C",
    highlight: { background: "#FF9392", border: "#FF2E2C" },
  };
  const expectedPartialColor = { background: "#D2E5FF" };
  const expectedOrphanPartialColor = {
    background: "#CE83FC",
    border: "#B042F4",
    highlight: { background: "#CE83FC", border: "#B042F4" },
  };
  const expectedNodes = expect.arrayContaining([
    expect.objectContaining({ id: "main", color: expectedFileColor }),
    expect.objectContaining({ id: "_header", color: expectedPartialColor }),
    expect.objectContaining({ id: "_footer", color: expectedPartialColor }),
    expect.objectContaining({ id: "mobile", color: expectedFileColor }),
    expect.objectContaining({
      id: "vars/_colors",
      color: expectedPartialColor,
    }),
    expect.objectContaining({
      id: "_orphan-partial",
      color: expectedOrphanPartialColor,
    }),
  ]);
  expect(visGraph.nodes).toEqual(expectedNodes);
});
