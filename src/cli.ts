#!/usr/bin/env node
import * as program from "commander";
import * as path from "path";
import * as fs from "fs";

import { generateVisualGraph } from "./index";

program
  .arguments("<dir>")
  .option(
    "-s, --simple",
    "Generate a simpler visualization (not recommended for complex graphs)",
  )
  .action(
    (dir): void => {
      const sassFolder = path.join(process.cwd(), dir);
      if (!isFolder(sassFolder)) {
        console.log("Given argument should be a folder.");
        return process.exit(1);
      }

      generateVisualGraph(sassFolder, program.simple);
    },
  )
  .parse(process.argv);

function isFolder(folder: string): boolean {
  return fs.existsSync(folder) && fs.lstatSync(folder).isDirectory();
}
