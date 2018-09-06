import * as path from "path";
import { generateDepsGraph } from "../../src";

generateDepsGraph(path.join(__dirname, "fixtures"));
