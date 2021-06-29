import * as path from "path";
import { generateVisualGraph } from "../../src";

generateVisualGraph(path.join(__dirname, "fixtures/application"), {
  loadPaths: [path.join(__dirname, "fixtures/packages")],
});
