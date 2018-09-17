import * as express from "express";
// @ts-ignore (missing typings)
import * as opn from "opn";

import { Graph } from "../../graph";
import { graphToVisGraph } from "./translator";

export function renderGraphToVisGraph(graph: Graph): void {
  const visGraph = graphToVisGraph(graph);

  const app = express();
  app.set("view engine", "pug");
  app.set("views", `${__dirname}/views`);
  app.use(express.static(`${__dirname}/assets`));

  app.get("/", (_req, res) =>
    res.render("index", {
      nodes: JSON.stringify(visGraph.nodes),
      edges: JSON.stringify(visGraph.edges),
    }),
  );
  app.listen("3000");

  // If `wait: true`, opn won't resolve until we quit the browser.
  // => don't wait and exit the process after page is open.
  opn("http://localhost:3000", { wait: false })
    // Wait for the page to be open & resources to be loaded before we exit.
    .then(() => setTimeout(() => process.exit(0), 2000));
}
