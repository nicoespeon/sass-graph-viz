#!/usr/bin/env node
import * as program from "commander";
import * as path from "path";

import { generateVisualGraph } from "./index";

const DEFAULT_PORT = 3000;

program
  .arguments("<target>")
  .option(
    "-e, --exclude-externals",
    "Omit files that are not under given target",
  )
  .option(
    "-s, --simple",
    "Generate a simpler visualization (not recommended for complex graphs)",
  )
  .option("-p, --port <port>", `Port to use [${DEFAULT_PORT}]`)
  .action(
    (target): void => {
      const targetFullPath = path.join(process.cwd(), target);
      const port = Number(program.port) || DEFAULT_PORT;

      generateVisualGraph(targetFullPath, {
        excludeExternals: program.excludeExternals,
        useSimpleViz: program.simple,
        port,
      });
    },
  )
  .parse(process.argv);
