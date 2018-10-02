import * as fs from "fs";

export type Path = string;

export function isFolder(target: Path): boolean {
  return fs.existsSync(target) && fs.lstatSync(target).isDirectory();
}
