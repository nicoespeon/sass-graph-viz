import { Graph } from "../../graph";
import { graphToVisGraph } from "./translator";

it("translate an empty graph", () => {
  const graph = new Graph();

  const visGraph = graphToVisGraph(graph);

  const emptyVisGraph = { nodes: [], edges: [] };
  expect(visGraph).toEqual(emptyVisGraph);
});

it("translate a graph with some vertices", () => {
  const graph = new Graph();
  graph.addVertice("main", "_header");
  graph.addVertice("main", "_footer");

  const visGraph = graphToVisGraph(graph);

  const expectedVisGraph = {
    nodes: [
      { id: "main", label: "main" },
      { id: "_header", label: "_header" },
      { id: "_footer", label: "_footer" },
    ],
    edges: [{ from: "main", to: "_header" }, { from: "main", to: "_footer" }],
  };
  expect(visGraph).toEqual(expectedVisGraph);
});
