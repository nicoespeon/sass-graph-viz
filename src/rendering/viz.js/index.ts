import * as express from "express";
// @ts-ignore (missing typings)
import * as opn from "opn";
// @ts-ignore (missing typings)
import * as Viz from "viz.js";
// @ts-ignore (missing typings)
import { Module, render } from "viz.js/full.render";

import { Graph } from "../../graph";
import { graphToVizGraph } from "./translator";

export function renderGraphToVizGraph(port: number, graph: Graph): void {
  const app = express();
  const vizGraph = graphToVizGraph(graph);

  new Viz({ Module, render })
    .renderString(`digraph { ${vizGraph} }`)
    .then((graphHtml: any) => {
      app.get("/", (req, res) => res.send(graphHtml));
      app.listen(port);
      // If `wait: true`, opn won't resolve until we quit the browser.
      // => don't wait and exit the process after page is open.
      return opn(`http://localhost:${port}`, { wait: false });
    })
    // Wait a bit for the page to be open before we exit.
    .then(() => setTimeout(() => process.exit(0), 300))
    .catch((error: any) => {
      console.error(error);
      console.log(vizGraph);
    });
}
