import * as sassGraph from "sass-graph";
import { sassGraphGraphToGraph, Graph, Vertice } from "./index";

it("return empty graph if sass graph has empty index", () => {
  const dir = "path/to/dir";
  const emptyIndexSassGraph: sassGraph.Graph = {
    dir,
    extensions: ["scss", "sass"],
    index: {},
    loadPaths: ["path/to/load"],
    addFile: () => {},
    visitAncestors: () => {},
    visitDescendents: () => {},
    visit: () => {},
  };

  const graph = sassGraphGraphToGraph(emptyIndexSassGraph);

  const emptyGraph = new Graph();
  expect(graph).toEqual(emptyGraph);
});

describe("sass graph with index", () => {
  it("return graph for 1 import", () => {
    const dir = "path/to/dir";
    const sassGraphWithIndex: sassGraph.Graph = {
      dir,
      extensions: ["scss", "sass"],
      index: {
        [`${dir}/_child.scss`]: {
          imports: [],
          importedBy: [`${dir}/parent.scss`],
          modified: "2018-01-01T00:00:00.000Z",
        },
      },
      loadPaths: ["path/to/load"],
      addFile: () => {},
      visitAncestors: () => {},
      visitDescendents: () => {},
      visit: () => {},
    };

    const graph = sassGraphGraphToGraph(sassGraphWithIndex);

    const expectedGraph = new Graph();
    expectedGraph.addVertice(new Vertice("parent", "_child"));
    expect(graph).toEqual(expectedGraph);
  });

  it("return graph for a basic import tree", () => {
    const dir = "path/to/dir";
    const sassGraphWithIndex: sassGraph.Graph = {
      dir,
      extensions: ["scss", "sass"],
      index: {
        [`${dir}/_base.scss`]: {
          imports: [],
          importedBy: [`${dir}/main.scss`],
          modified: "2018-01-01T00:00:00.000Z",
        },
        [`${dir}/_colors.scss`]: {
          imports: [],
          importedBy: [`${dir}/_footer.scss`, `${dir}/_header.scss`],
          modified: "2018-01-01T00:00:00.000Z",
        },
        [`${dir}/_footer.scss`]: {
          imports: [`${dir}/_colors.scss`],
          importedBy: [`${dir}/main.scss`],
          modified: "2018-01-01T00:00:00.000Z",
        },
        [`${dir}/_header.scss`]: {
          imports: [`${dir}/_colors.scss`],
          importedBy: [`${dir}/main.scss`],
          modified: "2018-01-01T00:00:00.000Z",
        },
        [`${dir}/main.scss`]: {
          imports: [
            `${dir}/_base.scss`,
            `${dir}/_header.scss`,
            `${dir}/_footer.scss`,
          ],
          importedBy: [],
          modified: "2018-01-01T00:00:00.000Z",
        },
      },
      loadPaths: ["path/to/load"],
      addFile: () => {},
      visitAncestors: () => {},
      visitDescendents: () => {},
      visit: () => {},
    };

    const graph = sassGraphGraphToGraph(sassGraphWithIndex);

    const expectedGraph = new Graph();
    expectedGraph.addVertice(new Vertice("main", "_base"));
    expectedGraph.addVertice(new Vertice("_footer", "_colors"));
    expectedGraph.addVertice(new Vertice("_header", "_colors"));
    expectedGraph.addVertice(new Vertice("main", "_footer"));
    expectedGraph.addVertice(new Vertice("main", "_header"));
    expect(graph).toEqual(expectedGraph);
  });
});
