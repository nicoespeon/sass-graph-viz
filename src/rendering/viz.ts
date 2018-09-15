import * as express from "express";
// @ts-ignore
import * as opn from "opn";
// @ts-ignore
import * as Viz from "viz.js";
// @ts-ignore
import { Module, render } from "viz.js/full.render";

import { Graph } from "../graph";

type VizGraph = string;

export function renderGraphToVizGraph(graph: Graph): void {
  const app = express();
  const vizGraph = graphToVizGraph(graph);

  new Viz({ Module, render })
    .renderString(`digraph { ${vizGraph} }`)
    .then((graphHtml: any) => {
      app.get("/", (req, res) => res.send(graphHtml));
      app.listen("3000");
      // If `wait: true`, opn won't resolve until we quit the browser.
      // => don't wait and exit the process after page is open.
      return opn("http://localhost:3000", { wait: false });
    })
    // Wait a bit for the page to be open before we exit.
    .then(() => setTimeout(() => process.exit(0), 300))
    .catch((error: any) => {
      console.error(error);
      console.log(vizGraph);
    });
}

export function graphToVizGraph(graph: Graph): VizGraph {
  return Array.from(graph.vertices)
    .map((vertice) => {
      const [parent, child] = vertice.nodes.map(escapeUnsupportedCharacter);
      return `${parent} -> ${child}`;
    })
    .join("\n");
}

function escapeUnsupportedCharacter(s: string): string {
  return s.match(/[-\/]/g) ? `"${s}"` : s;
}
