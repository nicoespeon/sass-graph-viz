import { Graph } from "../graph";
import { graphToVizGraph } from "./viz";

it("should compute an empty graph", () => {
  const graph = new Graph();

  const vizGraph = graphToVizGraph(graph);

  expect(vizGraph).toBe("");
});

it("should compute an simple graph", () => {
  const graph = new Graph();
  graph.addVertice("main", "_header");

  const vizGraph = graphToVizGraph(graph);

  expect(vizGraph).toBe("main -> _header");
});

it("should compute a complex graph", () => {
  const graph = new Graph();
  graph.addVertice("main", "_header");
  graph.addVertice("main", "_footer");
  graph.addVertice("_header", "_colors");
  graph.addVertice("_footer", "_colors");

  const vizGraph = graphToVizGraph(graph);

  const expectedVizGraph = [
    "main -> _header",
    "main -> _footer",
    "_header -> _colors",
    "_footer -> _colors",
  ].join("\n");
  expect(vizGraph).toBe(expectedVizGraph);
});

it("should parse unsupported '-' character in node name", () => {
  const graph = new Graph();
  graph.addVertice("main", "_mobile-sidebar");

  const vizGraph = graphToVizGraph(graph);

  expect(vizGraph).toBe("main -> _mobile_sidebar");
});
